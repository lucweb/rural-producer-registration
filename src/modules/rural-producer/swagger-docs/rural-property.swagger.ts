import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { RuralProperty } from '../entity/rural-property.entity';

export function ControllerRuralPropertySwagger() {
  return applyDecorators(
    ApiTags('Propriedade Rural')
  )
}

export function SearchPropertyByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar propriedade rural pelo ID' }),
    ApiParam({ name: 'id', description: 'ID da propriedade rural', type: String }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Propriedade rural encontrada.',
      type: RuralProperty,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Propriedade rural não encontrada.',
    }),
  )
}

export function DeletePropertySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Excluir propriedade rural' }),
    ApiParam({ name: 'id', description: 'ID da propriedade rural', type: String }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Propriedade rural excluída com sucesso.',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Propriedade rural não encontrada.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro ao tentar excluir a propriedade rural.',
    }),
  )
}
