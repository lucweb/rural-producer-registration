import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Harvest } from '../../entity/harvest.entity';
import { RuralProperty } from '../../entity/rural-property.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HarvestService } from '../../sevices/harvest.service';
import { PlantedCultureService } from '../../sevices/planted-culture.service';

describe('Harvest Service (Integration Mocked)', () => {
  let service: HarvestService;
  let harvestRepository: Repository<Harvest>;
  let plantedCultureService: PlantedCultureService;
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
        HarvestService,
        PlantedCultureService,
        {
          provide: getRepositoryToken(Harvest),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: PlantedCultureService,
          useValue: {
            handlePlantedCultures: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<HarvestService>(HarvestService);
    harvestRepository = moduleRef.get<Repository<Harvest>>(getRepositoryToken(Harvest));
    plantedCultureService = moduleRef.get<PlantedCultureService>(PlantedCultureService);
  });

  describe('handle Harvests', () => {
    it('should create new harvests correctly', async () => {
      const mockRuralProperty = { id: 'property1', harvests: [] } as RuralProperty;
      const mockInputHarvests = [
        { totalArea: 50, cultures: [] },
      ];

      await service.handleHarvests(mockQueryRunner, mockInputHarvests, mockRuralProperty);

      expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.manager.create).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(Harvest, {
        totalArea: 50,
        ruralProperty: mockRuralProperty,
      });
    });

    it('should throw error if harvest not found', async () => {
      const mockRuralProperty = { id: 'property1', harvests: [] } as RuralProperty;
      const mockInputHarvests = [
        { id: 'nonExistentId', totalArea: 50, cultures: [] },
      ];

      await expect(
        service.handleHarvests(mockQueryRunner, mockInputHarvests, mockRuralProperty),
      ).rejects.toThrow(NotFoundException);
    });

    it('should delete a harvest correctly', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValueOnce({ id: '1' } as Harvest);
      jest.spyOn(harvestRepository, 'remove').mockResolvedValueOnce({ id: '1' } as Harvest);

      await service.delete('1');

      expect(harvestRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(harvestRepository.remove).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw NotFoundException if harvest is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
    });
  });
});