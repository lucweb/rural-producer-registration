import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RuralPropertyService } from '../../sevices/rural-property.service';
import { HarvestService } from '../../sevices/harvest.service';
import { RuralProducer } from '../../entity/rural-producer.entity';
import { RuralProperty } from '../../entity/rural-property.entity';

describe('Rural Property Service (Integrated)', () => {
  let service: RuralPropertyService;
  let mockQueryRunner: any;

  beforeEach(async () => {
    mockQueryRunner = {
      manager: {
        save: jest.fn(),
        remove: jest.fn(),
        create: jest.fn((entity, data) => ({ ...data })),
      },
    };

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

  describe('handleRuralProperties', () => {
    it('must create, update and delete properties correctly', async () => {
      const mockProducer = { id: 'producer1' } as RuralProducer;
      const mockExistingProperties = [
        { id: 'property1', totalArea: 100 } as RuralProperty,
      ];
      const mockInputProperties = [
        { id: 'property1', totalArea: 100, harvests: [] },
        { totalArea: 50, harvests: [] },
      ];

      await service.handleRuralProperties(
        mockQueryRunner,
        mockInputProperties,
        mockProducer,
        mockExistingProperties,
      );

      expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(2); 
      expect(mockQueryRunner.manager.remove).toHaveBeenCalledTimes(0); 
    });

    it('should throw error if property to be updated does not exist', async () => {
      const mockProducer = { id: 'producer1' } as RuralProducer;
      const mockExistingProperties = [
        { id: 'property1', totalArea: 100 } as RuralProperty,
      ];
      const mockInputProperties = [
        { id: 'property2', totalArea: 100, harvests: [] },
      ];

      await expect(
        service.handleRuralProperties(
          mockQueryRunner,
          mockInputProperties,
          mockProducer,
          mockExistingProperties,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
