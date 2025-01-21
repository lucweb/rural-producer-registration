import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantedCulture } from '../entity/planted-culture.entity';

@Injectable()
export class PlantedCultureService {
    constructor(
        @InjectRepository(PlantedCulture)
        private readonly repository: Repository<PlantedCulture>
    ) { }

    async searchById(id: string): Promise<PlantedCulture> {
        const model = await this.repository.findOne({ where: { id } });
        if (!model) {
            throw new NotFoundException('Culturas plantadas não encontrada');
        }
        return model;
    }

    async delete(id: string): Promise<void> {
        const model = await this.searchById(id);
        await this.repository.remove(model);
    }
}
