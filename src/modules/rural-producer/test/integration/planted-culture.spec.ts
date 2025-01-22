import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PlantedCultureService } from '../../sevices/planted-culture.service';
import { PlantedCulture } from '../../entity/planted-culture.entity';
import { Harvest } from '../../entity/harvest.entity';

describe('Planted Culture Service (Integration Mocked)', () => {
  let service: PlantedCultureService;
  let mockRepository: any;
  let mockQueryRunner: any;

  beforeAll(async () => {
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    mockQueryRunner = {
      manager: {
        create: jest.fn((entity, data) => ({ ...data })),
        save: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantedCultureService,
        {
          provide: 'PlantedCultureRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PlantedCultureService>(PlantedCultureService);
  });

  describe('searchById', () => {
    it('should return a planted culture if found', async () => {
      const mockCulture = { id: 'test-id', name: 'Test Culture' };
      mockRepository.findOne.mockResolvedValue(mockCulture);

      const result = await service.searchById('test-id');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'test-id' } });
      expect(result).toEqual(mockCulture);
    });

    it('should throw NotFoundException if no culture is found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.searchById('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a planted culture if found', async () => {
      const mockCulture = { id: 'test-id', name: 'Test Culture' };
      mockRepository.findOne.mockResolvedValue(mockCulture);
      mockRepository.remove.mockResolvedValue(undefined);

      await service.delete('test-id');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'test-id' } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockCulture);
    });

    it('should throw NotFoundException if no culture is found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.delete('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('handlePlantedCultures', () => {
    it('should create and save planted cultures', async () => {
      const mockHarvest = { id: 'harvest-id', name: 'Harvest Test' } as Harvest;
      const mockCultures = [{ name: 'Wheat' }, { name: 'Corn' }];
      mockQueryRunner.manager.save.mockResolvedValue(mockCultures);

      await service.handlePlantedCultures(mockQueryRunner, mockCultures, mockHarvest);

      expect(mockQueryRunner.manager.create).toHaveBeenCalledTimes(mockCultures.length);
    });
  });
});
