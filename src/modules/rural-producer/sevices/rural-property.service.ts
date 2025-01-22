import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuralProperty } from '../entity/rural-property.entity';
import { HarvestService } from './harvest.service';
import { RuralProducer } from '../entity/rural-producer.entity';

@Injectable()
export class RuralPropertyService {
    constructor(
        @InjectRepository(RuralProperty)
        private readonly repository: Repository<RuralProperty>,
        private harvestService: HarvestService,
    ) { }

    validateFarmAreas(model: RuralProperty): boolean {
        const { totalArea, agriculturalArea, vegetationArea } = model;

        if (agriculturalArea < 0 || vegetationArea < 0) {
            throw new Error("As áreas agricultável e de vegetação não podem ser negativas.");
        }

        if (totalArea < 0) {
            throw new Error("A área total não pode ser negativa.");
        }

        if (agriculturalArea + vegetationArea > totalArea) {
            throw new Error(
                "A soma das áreas agricultável e de vegetação não pode ultrapassar a área total."
            );
        }
        return true;
    }

    async handleRuralProperties(
        queryRunner: any,
        ruralProperties: any[],
        producer: RuralProducer,
        existingProperties: RuralProperty[]
    ): Promise<void> {
        const propertyIds = ruralProperties.map((p) => p.id).filter(Boolean);
        const propertiesToDelete = existingProperties.filter(
            (p) => !propertyIds.includes(p.id),
        );

        for (const property of ruralProperties) {

            this.validateFarmAreas(property);

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
            await this.harvestService.handleHarvests(queryRunner, harvests, ruralProperty);
        }

        for (const property of propertiesToDelete) {
            await queryRunner.manager.remove(RuralProperty, property);
        }
    }


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
