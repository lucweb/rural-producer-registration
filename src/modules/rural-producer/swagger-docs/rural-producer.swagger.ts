import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { CreateRuralProducerDto } from 'src/modules/rural-producer/dto/create-producer.dto';
import { RuralProducer } from 'src/modules/rural-producer/entity/rural-producer.entity';
import { UpdateProducerDto } from 'src/modules/rural-producer/dto/update-producer.dto';

export function ControllerRuralProducerSwagger() {
  return applyDecorators(
    ApiTags('Produtores Rurais')
  )
}

export function CreateProducerSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar um novo produtor rural' }),
    ApiBody({ type: CreateRuralProducerDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Produtor rural criado com sucesso.',
      type: RuralProducer,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Dados inválidos ou campos obrigatórios ausentes.',
    }),
  )
}

export function ListAllProducersSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos os produtores rurais' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Lista de produtores rurais retornada com sucesso.',
      type: [RuralProducer],
    }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Nenhum produtor rural encontrado.',
    }),
  )
}

export function SearchProducerByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar um produtor rural pelo ID' }),
    ApiParam({ name: 'id', description: 'ID do produtor rural', type: String }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Produtor rural encontrado.',
      type: RuralProducer,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Produtor rural não encontrado.',
    }),
  )
}

export function UpdateProducerSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar um produtor rural' }),
    ApiParam({ name: 'id', description: 'ID do produtor rural', type: String }),
    ApiBody({ type: UpdateProducerDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Produtor rural atualizado com sucesso.',
      type: RuralProducer,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Produtor rural não encontrado.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Dados inválidos ou campos obrigatórios ausentes.',
    }),
  )
}

export function DeleteProducerSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Excluir um produtor rural' }),
    ApiParam({ name: 'id', description: 'ID do produtor rural', type: String }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Produtor rural excluído com sucesso.',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Produtor rural não encontrado.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro ao tentar excluir o produtor rural.',
    }),
  )
}
