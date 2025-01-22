import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { RuralPropertyService } from '../../sevices/rural-property.service';
import { HarvestService } from '../../sevices/harvest.service';
import { RuralProperty } from '../../entity/rural-property.entity';

describe('Rural Property Service', () => {
    let service: RuralPropertyService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                RuralPropertyService,
                {
                    provide: 'RuralPropertyRepository',
                    useClass: Repository, 
                },
                {
                    provide: HarvestService,
                    useValue: {
                        handleHarvests: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = moduleRef.get<RuralPropertyService>(RuralPropertyService);
    });

    describe('validateFarmAreas', () => {
        it('must return true for valid areas', () => {
            const validProperty = {
                totalArea: 100,
                agriculturalArea: 60,
                vegetationArea: 40,
            } as RuralProperty;

            expect(service.validateFarmAreas(validProperty)).toBe(true);
        });

        it('should throw error if sum of areas exceeds total area', () => {
            const invalidProperty = {
                totalArea: 100,
                agriculturalArea: 70,
                vegetationArea: 50,
            } as RuralProperty;

            expect(() => service.validateFarmAreas(invalidProperty)).toThrow(
                "A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.",
            );
        });

        it('should throw error if arable area is negative', () => {
            const invalidProperty = {
                totalArea: 100,
                agriculturalArea: -10,
                vegetationArea: 50,
            } as RuralProperty;

            expect(() => service.validateFarmAreas(invalidProperty)).toThrow(
                "As áreas agricultável e de vegetação não podem ser negativas.",
            );
        });

        it('should throw error if vegetation area is negative', () => {
            const invalidProperty = {
                totalArea: 100,
                agriculturalArea: 40,
                vegetationArea: -10,
            } as RuralProperty;

            expect(() => service.validateFarmAreas(invalidProperty)).toThrow(
                "As áreas agricultável e de vegetação não podem ser negativas.",
            );
        });

        it('should throw error if total area is negative', () => {
            const invalidProperty = {
                totalArea: -100,
                agriculturalArea: 40,
                vegetationArea: 50,
            } as RuralProperty;

            expect(() => service.validateFarmAreas(invalidProperty)).toThrow(
                "A área total não pode ser negativa.",
            );
        });
    });
});
