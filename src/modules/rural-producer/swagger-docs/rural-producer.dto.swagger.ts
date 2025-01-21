import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
/***
  Swagger properties RuralPropertyDto
***/
export function IdRuralPropertySwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'ID da propriedade rural',
      required,
    })
  );
}

export function FarmNameSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Nome da fazenda',
      required,
    })
  );
}

export function PropertyCitySwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Cidade onde está localizada a propriedade',
      required,
    })
  );
}

export function PropertyStateSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Estado onde está localizada a propriedade',
      required,
    })
  );
}

export function TotalAreaSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Área total da propriedade',
      type: Number,
      required,
    })
  );
}

export function AgriculturalAreaSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Área agrícola da propriedade',
      type: Number,
      required,
    })
  );
}

export function VegetationAreaSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Área de vegetação da propriedade',
      type: Number,
      required,
    })
  );
}

export function PropertyHarvestsSwagger(
  model: Function,
  required: boolean = false
) {
  return applyDecorators(
    ApiProperty({
      description: 'Colheitas da propriedade rural',
      type: [model],
      required,
    })
  );
}

/***
  Swagger properties HarvestDto
***/
export function PropertyIdSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'ID da colheita',
      required,
    })
  );
}

export function PropertyNameSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Nome da colheita',
      required,
    })
  );
}

export function PropertyYearSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Ano da colheita',
      type: Number,
      required,
    })
  );
}

export function PropertyTotalAreaSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Área total da colheita',
      type: Number,
      required,
    })
  );
}

export function PropertyCulturesSwagger(
  model: Function,
  required: boolean = false
) {
  return applyDecorators(
    ApiProperty({
      description: 'Culturas plantadas na colheita',
      type: [model],
      required,
    })
  );
}

/***
  Swagger properties PlantedCulture
***/
export function PropertyPlantedCultureIdSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'ID da cultura plantada',
      required,
    })
  );
}

export function PropertyPlantedCultureNameSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Nome da cultura',
      required,
    })
  );
}

export function PropertyPlantedCultureQuantityPlantedSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Quantidade plantada da cultura',
      required,
    })
  );
}

/***
  Swagger properties UpdateProducerDto
***/
export function PropertyProducerNameSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'Nome do produtor rural',
      required,
    })
  );
}

export function PropertyProducerCpfCnpjSwagger(required: boolean = false) {
  return applyDecorators(
    ApiProperty({
      description: 'CPF ou CNPJ do produtor rural',
      required,
    })
  );
}

export function PropertyProducerRuralPropertiesSwagger(
  model: Function,
  required: boolean = false
) {
  return applyDecorators(
    ApiProperty({
      description: 'Propriedades rurais associadas ao produtor',
      type: [model],
      required,
    })
  );
}
