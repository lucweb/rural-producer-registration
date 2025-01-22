import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Harvest } from '../../entity/harvest.entity';
import { NotFoundException } from '@nestjs/common';
import { PlantedCultureService } from '../../sevices/planted-culture.service';
import { HarvestService } from '../../sevices/harvest.service';

describe('HarvestService (Unit)', () => {
  let service: HarvestService;
  let repository: Repository<Harvest>;
  let plantedCultureService: PlantedCultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: getRepositoryToken(Harvest),
          useClass: Repository,
        },
        {
          provide: PlantedCultureService,
          useValue: {
            handlePlantedCultures: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    repository = module.get<Repository<Harvest>>(getRepositoryToken(Harvest));
    plantedCultureService = module.get<PlantedCultureService>(PlantedCultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(plantedCultureService).toBeDefined();
  });

  describe('searchById', () => {
    it('should return a harvest if found', async () => {
      const mockHarvest = { 
        id: '1', 
        name: 'Test Harvest', 
        year: 2021 
    } as unknown as Harvest;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockHarvest);

      const result = await service.searchById('1');
      expect(result).toEqual(mockHarvest);
    });

    it('should throw NotFoundException if harvest is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.searchById('1')).rejects.toThrow(
        new NotFoundException('Safra não encontrada'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a harvest', async () => {
      const mockHarvest = { id: '1' } as Harvest;
      jest.spyOn(service, 'searchById').mockResolvedValue(mockHarvest);
      jest.spyOn(repository, 'remove').mockResolvedValue(null);

      await service.delete('1');
      expect(service.searchById).toHaveBeenCalledWith('1');
      expect(repository.remove).toHaveBeenCalledWith(mockHarvest);
    });
  });
});
