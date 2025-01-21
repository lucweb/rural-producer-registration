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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuralProducerService,
        {
          provide: getRepositoryToken(RuralProducer),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(RuralProperty),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RuralProducerService>(RuralProducerService);
    producerRepository = module.get(getRepositoryToken(RuralProducer));
    propertyRepository = module.get(getRepositoryToken(RuralProperty));
  });

  it('should create a rural producer', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'Test Producer',
      cpfCnpj: '12345678901',
      ruralProperties: [],
    };

    producerRepository.findOne.mockResolvedValue(null); // No duplicate CPF/CNPJ
    producerRepository.create.mockReturnValue(createDto as any);
    producerRepository.save.mockResolvedValue({ id: '1', ...createDto } as any);

    const result = await service.create(createDto);

    expect(producerRepository.findOne).toHaveBeenCalledWith({
      where: { cpfCnpj: createDto.cpfCnpj },
    });
    expect(producerRepository.save).toHaveBeenCalled();
    expect(result).toEqual(expect.objectContaining({ name: 'Test Producer' }));
  });

  it('should throw an error for duplicate CPF/CNPJ', async () => {
    producerRepository.findOne.mockResolvedValue({ id: '1', cpfCnpj: '12345678901' } as any);

    const createDto: CreateRuralProducerDto = {
      name: 'Duplicate Producer',
      cpfCnpj: '12345678901', // Duplicate CPF/CNPJ
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
