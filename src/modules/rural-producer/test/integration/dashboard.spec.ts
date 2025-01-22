import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RuralProperty } from '../../entity/rural-property.entity';
import { PlantedCulture } from '../../entity/planted-culture.entity';
import { DashboardService } from '../../sevices/dashboard.service';
import { CreateRuralProducerDto } from '../../dto/create-producer.dto';
import { RuralProducerService } from '../../sevices/rural-producer.service';
import { PlantedCultureService } from '../../sevices/planted-culture.service';
import { HarvestService } from '../../sevices/harvest.service';
import { RuralPropertyService } from '../../sevices/rural-property.service';
import { RuralProducer } from '../../entity/rural-producer.entity';
import { Harvest } from '../../entity/harvest.entity';

describe('Dashboard Service (Integration)', () => {
  let service: DashboardService;
  let producerService: RuralProducerService;
  let cultureRepository: Repository<PlantedCulture>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [
            RuralProducer,
            RuralProperty,
            Harvest,
            PlantedCulture,
          ],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          RuralProducer,
          RuralProperty,
          Harvest,
          PlantedCulture,
        ]),
      ],
      providers: [
        DashboardService,
        RuralProducerService,
        RuralPropertyService,
        HarvestService,
        PlantedCultureService,
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);

    producerService = module.get<RuralProducerService>(RuralProducerService);
    cultureRepository = module.get<Repository<PlantedCulture>>(getRepositoryToken(PlantedCulture));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and retrieve dashboard data correctly', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Test Producer',
      cpfCnpj: '274.072.910-39',
      ruralProperties: [
        {
          farmName: 'Test Property',
          agriculturalArea: 100,
          city: '',
          state: '',
          totalArea: 150,
          vegetationArea: 45,
          harvests: [
            {
              year: 2023,
              cultures: [{ name: 'Corn', quantityPlanted: 50 }],
              name: 'test',
              totalArea: 0
            },
          ],
        },
      ],
    };

    await producerService.create(createDto);

    const data = await service.getDashboardData();
    
    expect(data.totalFarms).toBeGreaterThan(0);
    expect(data.totalHectares).toBeGreaterThan(0);
    expect(data.farmsByState.length).toBeGreaterThan(0);
    expect(data.farmsByCulture.length).toBeGreaterThan(0);
    expect(data.landUsage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'Agricultural Area', area: expect.any(Number) }),
        expect.objectContaining({ type: 'Vegetation Area', area: expect.any(Number) }),
      ])
    );
  });
});
