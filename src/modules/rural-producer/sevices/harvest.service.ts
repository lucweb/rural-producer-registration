import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from '../entity/harvest.entity';
import { PlantedCultureService } from './planted-culture.service';
import { RuralProperty } from '../entity/rural-property.entity';

@Injectable()
export class HarvestService {
    constructor(
        @InjectRepository(Harvest)
        private readonly repository: Repository<Harvest>,
        private plantedCultureService: PlantedCultureService,
    ) { }

    async handleHarvests(
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
            await this.plantedCultureService.handlePlantedCultures(queryRunner, cultures, harvestEntity);
        }
    }

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
