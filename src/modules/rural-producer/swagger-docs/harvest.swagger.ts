import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { Harvest } from '../entity/harvest.entity';

export function ControllerHarvestSwagger() {
  return applyDecorators(
    ApiTags('Safra')
  )
}

export function SearchHarvestByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar safra pelo ID' }),
    ApiParam({ name: 'id', description: 'ID da safra', type: String }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Safra encontrada.',
      type: Harvest,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Safra não encontrada.',
    }),
  )
}

export function DeleteHarvestSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Excluir safra rural' }),
    ApiParam({ name: 'id', description: 'ID da safra', type: String }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Safra excluído com sucesso.',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Safra não encontrada.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro ao tentar excluir a safra.',
    }),
  )
}
