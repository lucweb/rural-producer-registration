import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { PlantedCultureService } from '../../sevices/planted-culture.service';
import { PlantedCulture } from '../../entity/planted-culture.entity';
import { Harvest } from '../../entity/harvest.entity';

describe('PlantedCultureService', () => {
  let service: PlantedCultureService;
  let repository: Repository<PlantedCulture>;

  const mockRepository = {
    findOne: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantedCultureService,
        {
          provide: getRepositoryToken(PlantedCulture),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PlantedCultureService>(PlantedCultureService);
    repository = module.get<Repository<PlantedCulture>>(getRepositoryToken(PlantedCulture));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchById', () => {
    it('should return a planted culture if found', async () => {
      const mockPlantedCulture = { id: '1', name: 'Culture' };
      mockRepository.findOne.mockResolvedValue(mockPlantedCulture);

      const result = await service.searchById('1');
      expect(result).toEqual(mockPlantedCulture);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException if no culture is found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.searchById('1')).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('delete', () => {
    it('should delete a planted culture if found', async () => {
      const mockPlantedCulture = { id: '1', name: 'Culture' };
      mockRepository.findOne.mockResolvedValue(mockPlantedCulture);
      mockRepository.remove.mockResolvedValue(undefined);

      await service.delete('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockPlantedCulture);
    });

    it('should throw NotFoundException if no culture is found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('handlePlantedCultures', () => {
    it('should create and save planted cultures', async () => {
      const mockQueryRunner = {
        manager: {
          create: jest.fn().mockImplementation((_, data) => data),
          save: jest.fn(),
        },
      };
      const mockCultures = [{ name: 'Wheat' }, { name: 'Corn' }];
      const mockHarvest = { id: '1', name: 'Harvest', year: 2021 } as Harvest;

      await service.handlePlantedCultures(mockQueryRunner, mockCultures, mockHarvest);

      expect(mockQueryRunner.manager.create).toHaveBeenCalledTimes(2);
      expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(PlantedCulture, expect.any(Array));
    });
  });
});
