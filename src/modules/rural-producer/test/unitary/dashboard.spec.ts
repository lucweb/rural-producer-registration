import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardService } from '../../sevices/dashboard.service';
import { RuralProperty } from '../../entity/rural-property.entity';
import { PlantedCulture } from '../../entity/planted-culture.entity';

describe('Dashboard Service (unit)', () => {
  let service: DashboardService;
  let ruralPropertyRepository: Repository<RuralProperty>;
  let cultureRepository: Repository<PlantedCulture>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(RuralProperty),
          useValue: {
            count: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            groupBy: jest.fn().mockReturnThis(),
            getRawOne: jest.fn(),
            getRawMany: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PlantedCulture),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnThis(),
            leftJoin: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            groupBy: jest.fn().mockReturnThis(),
            getRawMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    ruralPropertyRepository = module.get<Repository<RuralProperty>>(getRepositoryToken(RuralProperty));
    cultureRepository = module.get<Repository<PlantedCulture>>(getRepositoryToken(PlantedCulture));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTotalFarms', () => {
    it('should return the total number of farms', async () => {
      ruralPropertyRepository.count = jest.fn().mockResolvedValue(5);
      const result = await service.getTotalFarms();
      expect(result).toBe(5);
      expect(ruralPropertyRepository.count).toHaveBeenCalled();
    });
  });

  describe('getTotalHectares', () => {
    it('should return the total hectares', async () => {
      ruralPropertyRepository.createQueryBuilder().getRawOne = jest.fn().mockResolvedValue({ totalArea: '1000' });
      const result = await service.getTotalHectares();
      expect(result).toBe(1000);
    });

    it('should return 0 if no hectares are found', async () => {
      ruralPropertyRepository.createQueryBuilder().getRawOne = jest.fn().mockResolvedValue({ totalArea: null });
      const result = await service.getTotalHectares();
      expect(result).toBe(0);
    });
  });

  describe('getFarmsByState', () => {
    it('should return the number of farms grouped by state', async () => {
      ruralPropertyRepository.createQueryBuilder().getRawMany = jest.fn().mockResolvedValue([{ state: 'SP', count: 3 }]);
      const result = await service.getFarmsByState();
      expect(result).toEqual([{ state: 'SP', count: 3 }]);
    });
  });

  describe('getFarmsByCulture', () => {
    it('should return the number of farms grouped by culture', async () => {
      cultureRepository.createQueryBuilder().getRawMany = jest.fn().mockResolvedValue([{ culture: 'Soybean', count: 5 }]);
      const result = await service.getFarmsByCulture();
      expect(result).toEqual([{ culture: 'Soybean', count: 5 }]);
    });
  });

  describe('getLandUsage', () => {
    it('should return the land usage data', async () => {
      ruralPropertyRepository.createQueryBuilder().getRawOne = jest.fn().mockResolvedValue({ agriculturalArea: '500', vegetationArea: '300' });
      const result = await service.getLandUsage();
      expect(result).toEqual([
        { type: 'Agricultural Area', area: 500 },
        { type: 'Vegetation Area', area: 300 },
      ]);
    });

    it('should return 0 for areas if no data is found', async () => {
      ruralPropertyRepository.createQueryBuilder().getRawOne = jest.fn().mockResolvedValue({ agriculturalArea: null, vegetationArea: null });
      const result = await service.getLandUsage();
      expect(result).toEqual([
        { type: 'Agricultural Area', area: 0 },
        { type: 'Vegetation Area', area: 0 },
      ]);
    });
  });

  describe('getDashboardData', () => {
    it('should return all dashboard data', async () => {
      const mockTotalFarms = 5;
      const mockTotalHectares = 1000;
      const mockFarmsByState = [{ state: 'SP', count: 3 }];
      const mockFarmsByCulture = [{ culture: 'Soybean', count: 5 }];
      const mockLandUsage = [
        { type: 'Agricultural Area', area: 500 },
        { type: 'Vegetation Area', area: 300 },
      ];

      jest.spyOn(service, 'getTotalFarms').mockResolvedValue(mockTotalFarms);
      jest.spyOn(service, 'getTotalHectares').mockResolvedValue(mockTotalHectares);
      jest.spyOn(service, 'getFarmsByState').mockResolvedValue(mockFarmsByState);
      jest.spyOn(service, 'getFarmsByCulture').mockResolvedValue(mockFarmsByCulture);
      jest.spyOn(service, 'getLandUsage').mockResolvedValue(mockLandUsage);

      const result = await service.getDashboardData();

      expect(result).toEqual({
        totalFarms: mockTotalFarms,
        totalHectares: mockTotalHectares,
        farmsByState: mockFarmsByState,
        farmsByCulture: mockFarmsByCulture,
        landUsage: mockLandUsage,
      });
    });
  });
});
