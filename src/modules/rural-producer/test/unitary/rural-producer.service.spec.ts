import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RuralProducer } from '../../entity/rural-producer.entity';
import { RuralProperty } from '../../entity/rural-property.entity';
import { CreateRuralProducerDto } from '../../dto/create-producer.dto';
import { RuralProducerService } from '../../sevices/rural-producer.service';

describe('RuralProducerService (Unit)', () => {
  let service: RuralProducerService;
  let producerRepository: jest.Mocked<Repository<RuralProducer>>;
  let propertyRepository: jest.Mocked<Repository<RuralProperty>>;

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
        {
          provide: getRepositoryToken(RuralProducer),
          useValue: mockProducerRepository,
        },
        {
          provide: getRepositoryToken(RuralProperty),
          useValue: propertyRepository, 
        },
      ],
    }).compile();

    service = module.get<RuralProducerService>(RuralProducerService);
    producerRepository = module.get(getRepositoryToken(RuralProducer));
  });

  it('should create a rural producer', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Test Producer',
      cpfCnpj: '12345678901',
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
      cpfCnpj: '12345678901', 
    } as any);

    const createDto: CreateRuralProducerDto = {
      name: 'Duplicate Producer',
      cpfCnpj: '12345678901',
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
