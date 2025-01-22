import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RuralProducer } from './../entity/rural-producer.entity';
import { UpdateProducerDto } from './../dto/update-producer.dto';
import { CreateRuralProducerDto } from './../dto/create-producer.dto';
import { RuralPropertyService } from './rural-property.service';
import { isValidCpfCnpj } from './../../../utils/validators-cpf-cnpj';

@Injectable()
export class RuralProducerService {
    constructor(
        @InjectRepository(RuralProducer)
        private readonly producerRepository: Repository<RuralProducer>,
        private ruralPropertyService: RuralPropertyService,
    ) { }

    private async checkCpfCnpjExistence(cpfCnpj: string, producerId?: string): Promise<void> {
        if (!isValidCpfCnpj(cpfCnpj))
            throw new BadRequestException('CPF/CNPJ é inválido');

        const condition = producerId ? { id: Not(producerId) } : {};

        const existingProducer = await this.producerRepository.findOne({
            where: { cpfCnpj, ...condition }
        });

        if (existingProducer)
            throw new BadRequestException('CPF/CNPJ já está em uso');
    }

    async create(createProdutorDto: CreateRuralProducerDto): Promise<RuralProducer> {

        const queryRunner = this.producerRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const { cpfCnpj, ruralProperties, ...producerData } = createProdutorDto;

            await this.checkCpfCnpjExistence(cpfCnpj);

            const producer = queryRunner.manager.create(RuralProducer, { ...producerData, cpfCnpj });
            await queryRunner.manager.save(RuralProducer, producer);

            if (ruralProperties && ruralProperties.length > 0) {
                const existingProperties = producer.ruralProperties || [];
                await this.ruralPropertyService.handleRuralProperties(queryRunner, ruralProperties, producer, existingProperties);
            }

            await queryRunner.commitTransaction();

            return await queryRunner.manager.findOne(RuralProducer, {
                where: { id: producer?.id },
                relations: ['ruralProperties'],
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(producerId: string, updateProducerDto: UpdateProducerDto): Promise<RuralProducer> {
        const queryRunner = this.producerRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const { cpfCnpj, ruralProperties, ...producerData } = updateProducerDto;

            const producer = await queryRunner.manager.findOne(RuralProducer, {
                where: { id: producerId },
                relations: [
                    'ruralProperties',
                    'ruralProperties.harvests',
                    'ruralProperties.harvests.cultures',
                ],
            });

            if (!producer) {
                throw new NotFoundException('Produtor não encontrado');
            }

            if (cpfCnpj) {
                await this.checkCpfCnpjExistence(cpfCnpj, producerId);
                producer.cpfCnpj = cpfCnpj;
            }

            Object.assign(producer, producerData);
            await queryRunner.manager.save(RuralProducer, producer);

            if (ruralProperties && ruralProperties.length > 0) {
                const existingProperties = producer.ruralProperties || [];
                await this.ruralPropertyService.handleRuralProperties(queryRunner, ruralProperties, producer, existingProperties);
            }

            await queryRunner.commitTransaction();

            return await queryRunner.manager.findOne(RuralProducer, {
                where: { id: producerId },
                relations: [
                    'ruralProperties',
                    'ruralProperties.harvests',
                    'ruralProperties.harvests.cultures',
                ],
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async listAll(): Promise<RuralProducer[]> {
        return this.producerRepository.find({ relations: ['ruralProperties'] });
    }

    async searchById(id: string): Promise<RuralProducer> {
        const producer = await this.producerRepository.findOne({ where: { id } });
        if (!producer) {
            throw new NotFoundException('Produtor rural não encontrado');
        }
        return producer;
    }

    async delete(id: string): Promise<void> {
        const producer = await this.searchById(id);
        await this.producerRepository.remove(producer);
    }
}
