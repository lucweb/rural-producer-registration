import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RuralProducer } from './../entity/rural-producer.entity';
import { UpdateProducerDto } from './../dto/update-producer.dto';
import { CreateRuralProducerDto } from './../dto/create-producer.dto';
import { RuralProperty } from './../entity/rural-property.entity';
import { Harvest } from './../entity/harvest.entity';
import { PlantedCulture } from './../entity/planted-culture.entity';

@Injectable()
export class RuralProducerService {
    constructor(
        @InjectRepository(RuralProducer)
        private readonly producerRepository: Repository<RuralProducer>
    ) { }

    private async checkCpfCnpjExistence(cpfCnpj: string, producerId?: string): Promise<void> {
        const condition = producerId ? { id: Not(producerId) } : {};

        const existingProducer = await this.producerRepository.findOne({
            where: { cpfCnpj, ...condition }
        });

        if (existingProducer)
            throw new BadRequestException('CPF/CNPJ já está em uso');
    }

    private async handleRuralProperties(
        queryRunner: any,
        ruralProperties: any[],
        producer: RuralProducer,
        existingProperties: RuralProperty[]
    ): Promise<void> {
        const propertyIds = ruralProperties.map((p) => p.id).filter(Boolean);
        const propertiesToDelete = existingProperties.filter(
            (p) => !propertyIds.includes(p.id),
        );

        // Processar as propriedades
        for (const property of ruralProperties) {
            const { id: propertyId, harvests, ...propertyData } = property;

            let ruralProperty: RuralProperty;
            if (propertyId) {
                ruralProperty = existingProperties.find((p) => p.id === propertyId);
                if (!ruralProperty) {
                    throw new NotFoundException(`Propriedade rural com ID ${propertyId} não encontrada`);
                }
                Object.assign(ruralProperty, propertyData);
            } else {
                ruralProperty = queryRunner.manager.create(RuralProperty, {
                    ...propertyData,
                    producer,
                });
            }
            await queryRunner.manager.save(RuralProperty, ruralProperty);
            await this.handleHarvests(queryRunner, harvests, ruralProperty);
        }

        for (const property of propertiesToDelete) {
            await queryRunner.manager.remove(RuralProperty, property);
        }
    }

    private async handleHarvests(
        queryRunner: any,
        harvests: any[],
        ruralProperty: RuralProperty
    ): Promise<void> {
        for (const harvest of harvests) {
            const { id: harvestId, cultures, ...harvestData } = harvest;

            let harvestEntity: Harvest;
            if (harvestId) {
                harvestEntity = ruralProperty.harvests.find((h) => h.id === harvestId);
                if (!harvestEntity) {
                    throw new NotFoundException(`Colheita com ID ${harvestId} não encontrada`);
                }
                Object.assign(harvestEntity, harvestData);
            } else {
                harvestEntity = queryRunner.manager.create(Harvest, {
                    ...harvestData,
                    ruralProperty,
                });
            }
            await queryRunner.manager.save(Harvest, harvestEntity);
            await this.handlePlantedCultures(queryRunner, cultures, harvestEntity);
        }
    }

    private async handlePlantedCultures(
        queryRunner: any,
        cultures: any[],
        harvestEntity: Harvest
    ): Promise<void> {
        const plantedCultures = cultures.map((culture) =>
            queryRunner.manager.create(PlantedCulture, {
                ...culture,
                harvests: harvestEntity,
            })
        );
        await queryRunner.manager.save(PlantedCulture, plantedCultures);
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
                await this.handleRuralProperties(queryRunner, ruralProperties, producer, existingProperties);
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
                await this.handleRuralProperties(queryRunner, ruralProperties, producer, existingProperties);
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
