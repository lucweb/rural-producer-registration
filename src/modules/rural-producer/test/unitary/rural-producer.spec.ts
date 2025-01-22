import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RuralProducer } from '../../entity/rural-producer.entity';
import { RuralProperty } from '../../entity/rural-property.entity';
import { CreateRuralProducerDto } from '../../dto/create-producer.dto';
import { RuralProducerService } from '../../sevices/rural-producer.service';
import { RuralPropertyService } from '../../sevices/rural-property.service';
import { HarvestService } from '../../sevices/harvest.service';
import { PlantedCultureService } from '../../sevices/planted-culture.service';
import { Harvest } from '../../entity/harvest.entity';
import { PlantedCulture } from '../../entity/planted-culture.entity';

describe('RuralProducerService (Unit)', () => {
  let service: RuralProducerService;
  let producerRepository: jest.Mocked<Repository<RuralProducer>>;

  const mockQueryRunner = {
    manager: {
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    },
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
  };

  const mockManager = {
    connection: {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    },
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockProducerRepository = {
    manager: mockManager,
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuralProducerService,
        RuralPropertyService,
        HarvestService,
        PlantedCultureService,
        {
          provide: getRepositoryToken(RuralProducer),
          useValue: mockProducerRepository,
        },
        {
          provide: getRepositoryToken(RuralProperty),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Harvest),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PlantedCulture),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RuralProducerService>(RuralProducerService);
    producerRepository = module.get(getRepositoryToken(RuralProducer));
  });

  it('should create a rural producer', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Test Producer',
      cpfCnpj: '877.106.720-51',
      ruralProperties: [],
    };

    await service.create(createDto)

    expect(producerRepository.findOne).toHaveBeenCalledWith({
      where: { cpfCnpj: createDto.cpfCnpj },
    });
  });

  it('should throw an error for duplicate CPF/CNPJ', async () => {
    producerRepository.findOne.mockResolvedValue({
      id: '1',
      cpfCnpj: '877.106.720-51', 
    } as any);

    const createDto: CreateRuralProducerDto = {
      name: 'Duplicate Producer',
      cpfCnpj: '877.106.720-51',
      ruralProperties: [],
    };

    await expect(service.create(createDto)).rejects.toThrow(
      'CPF/CNPJ já está em uso',
    );
    expect(producerRepository.findOne).toHaveBeenCalledWith({
      where: { cpfCnpj: createDto.cpfCnpj },
    });
  });
});
