import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducer } from '../../entity/rural-producer.entity';
import { RuralProperty } from '../../entity/rural-property.entity';
import { Harvest } from '../../entity/harvest.entity';
import { PlantedCulture } from '../../entity/planted-culture.entity';
import { CreateRuralProducerDto } from '../../dto/create-producer.dto';
import { RuralProducerService } from '../../sevices/rural-producer.service';
import { HarvestService } from '../../sevices/harvest.service';
import { PlantedCultureService } from '../../sevices/planted-culture.service';
import { RuralPropertyService } from '../../sevices/rural-property.service';

describe('Rural Producer Service (Integration)', () => {
  let service: RuralProducerService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [
            RuralProducer,
            RuralProperty,
            Harvest,
            PlantedCulture
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
        RuralProducerService,
        RuralPropertyService,
        HarvestService,
        PlantedCultureService,
      ],
    }).compile();

    service = module.get<RuralProducerService>(RuralProducerService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should create a rural producer', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Test Producer',
      cpfCnpj: '274.072.910-39',
      ruralProperties: [
        {
          farmName: 'Test Property',
          agriculturalArea: 50,
          city: 'goiania',
          state: 'go',
          totalArea: 160,
          vegetationArea: 100,
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

    const producer = await service.create(createDto);

    expect(producer).toBeDefined();
    expect(producer.name).toEqual(createDto.name);
    expect(producer.ruralProperties.length).toBe(1);
    expect(producer.ruralProperties[0].harvests.length).toBe(1);
  });

  it('should throw an error for duplicate CPF/CNPJ', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Duplicate Producer',
      cpfCnpj: '274.072.910-39',
      ruralProperties: [],
    };

    await expect(service.create({ ...createDto })).rejects.toThrow(
      'CPF/CNPJ já está em uso',
    );
  });

  it('should throw an error for invalid CPF/CNPJ', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Duplicate Producer',
      cpfCnpj: '274.072.910-00',
      ruralProperties: [],
    };

    await expect(service.create({ ...createDto })).rejects.toThrow(
      'CPF/CNPJ é inválido',
    );
  });
});
