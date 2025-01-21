import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from '../entity/harvest.entity';

@Injectable()
export class HarvestService {
    constructor(
        @InjectRepository(Harvest)
        private readonly repository: Repository<Harvest>
    ) { }

    async searchById(id: string): Promise<Harvest> {
        const model = await this.repository.findOne({ where: { id } });
        if (!model) {
            throw new NotFoundException('Safra não encontrada');
        }
        return model;
    }

    async delete(id: string): Promise<void> {
        const model = await this.searchById(id);
        await this.repository.remove(model);
    }
}
