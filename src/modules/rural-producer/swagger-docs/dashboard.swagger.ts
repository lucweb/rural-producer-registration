import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ControllerDashboardSwagger() {
  return applyDecorators(
    ApiTags('Dashboard')
  )
}

export function GetTotalFarmsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter o total de fazendas cadastradas' }),
    ApiResponse({
      status: 200,
      description: 'Retorna o total de fazendas cadastradas.',
    })
  )
}

export function GetTotalHectaresSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter o total de hectares registrados' }),
    ApiResponse({
      status: 200,
      description: 'Retorna o total de hectares registrados.',
    })
  )
}

export function GetFarmsByStateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter a contagem de fazendas por estado' }),
    ApiResponse({
      status: 200,
      description: 'Retorna a contagem de fazendas agrupadas por estado.',
      isArray: true,
    })
  )
}

export function GetFarmsByCultureSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter a contagem de fazendas por cultura plantada' }),
    ApiResponse({
      status: 200,
      description: 'Retorna a contagem de fazendas agrupadas por cultura plantada.',
      isArray: true,
    })
  )
}

export function GetLandUsageSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter dados de uso do solo' }),
    ApiResponse({
      status: 200,
      description: 'Retorna a área total destinada à agricultura e vegetação.',
      isArray: true,
    })
  )
}

export function GetDashboardDataSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter todos os dados do dashboard' }),
    ApiResponse({
      status: 200,
      description: 'Retorna todos os dados do dashboard, incluindo totais e agrupamentos.',
    })
  )
}
