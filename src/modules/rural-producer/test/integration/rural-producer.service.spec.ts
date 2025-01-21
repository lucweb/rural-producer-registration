import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducer } from '../../entity/rural-producer.entity';
import { RuralProperty } from '../../entity/rural-property.entity';
import { Harvest } from '../../entity/harvest.entity';
import { PlantedCulture } from '../../entity/planted-culture.entity';
import { CreateRuralProducerDto } from '../../dto/create-producer.dto';
import { RuralProducerService } from '../../sevices/rural-producer.service';

describe('RuralProducerService (Integration)', () => {
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
        TypeOrmModule.forFeature([RuralProducer, RuralProperty]),
      ],
      providers: [RuralProducerService],
    }).compile();

    service = module.get<RuralProducerService>(RuralProducerService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should create a rural producer', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Test Producer',
      cpfCnpj: '12345678901',
      ruralProperties: [
        {
          farmName: 'Test Property',
          agriculturalArea: 100,
          city: '',
          state: '',
          totalArea: 0,
          vegetationArea: 0,
          harvests: [
            {
              year: 2023,
              cultures: [{ name: 'Corn', quantityPlanted: 50 }],
              nome: '',
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
      cpfCnpj: '12345678901',
      ruralProperties: [],
    };

    await expect(service.create(createDto)).rejects.toThrow(
      'CPF/CNPJ já está em uso',
    );
  });
});
