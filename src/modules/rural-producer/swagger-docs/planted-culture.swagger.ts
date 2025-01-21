import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { PlantedCulture } from '../entity/planted-culture.entity';

export function ControllerPlantedCultureSwagger() {
  return applyDecorators(
    ApiTags('cultura plantada')
  )
}

export function SearchPlantedCultureByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar cultura plantada pelo ID' }),
    ApiParam({ name: 'id', description: 'ID da cultura plantada', type: String }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Cultura plantada encontrada.',
      type: PlantedCulture,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Cultura plantada não encontrada.',
    }),
  )
}

export function DeletePlantedCultureSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Excluir cultura plantada rural' }),
    ApiParam({ name: 'id', description: 'ID da cultura plantada', type: String }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Cultura plantada excluído com sucesso.',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Cultura plantada não encontrada.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro ao tentar excluir a Cultura plantada.',
    }),
  )
}
