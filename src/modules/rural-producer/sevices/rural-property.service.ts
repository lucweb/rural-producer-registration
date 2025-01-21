import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuralProperty } from '../entity/rural-property.entity';

@Injectable()
export class RuralPropertyService {
    constructor(
        @InjectRepository(RuralProperty)
        private readonly repository: Repository<RuralProperty>
    ) { }

    async searchById(id: string): Promise<RuralProperty> {
        const model = await this.repository.findOne({ where: { id } });
        if (!model) {
            throw new NotFoundException('Propriedade rural não encontrada');
        }
        return model;
    }

    async delete(id: string): Promise<void> {
        const model = await this.searchById(id);
        await this.repository.remove(model);
    }
}
