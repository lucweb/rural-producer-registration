import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';

import {
    AgriculturalAreaSwagger,
    FarmNameSwagger,
    PropertyCitySwagger,
    PropertyCulturesSwagger,
    PropertyHarvestsSwagger,
    PropertyNameSwagger,
    PropertyPlantedCultureNameSwagger,
    PropertyPlantedCultureQuantityPlantedSwagger,
    PropertyProducerCpfCnpjSwagger,
    PropertyProducerNameSwagger,
    PropertyProducerRuralPropertiesSwagger,
    PropertyStateSwagger,
    PropertyTotalAreaSwagger,
    PropertyYearSwagger,
    TotalAreaSwagger,
    VegetationAreaSwagger
} from '../swagger-docs/rural-producer.dto.swagger';

export class CreatePlantedCultureDto {
    @PropertyPlantedCultureNameSwagger(true)
    @IsString()
    @IsNotEmpty()
    name: string;

    @PropertyPlantedCultureQuantityPlantedSwagger(true)
    @IsNumber()
    @IsNotEmpty()
    quantityPlanted: number;
}

export class CreateHarvestDto {
    @PropertyNameSwagger(true)
    @IsString()
    @IsNotEmpty()
    name: string;

    @PropertyYearSwagger(true)
    @IsNumber()
    @IsNotEmpty()
    year: number;

    @PropertyTotalAreaSwagger(true)
    @IsNumber()
    @IsNotEmpty()
    totalArea: number;

    @PropertyCulturesSwagger(CreatePlantedCultureDto)
    @IsArray()
    @IsOptional()
    cultures?: CreatePlantedCultureDto[];
}

export class CreateRuralPropertyDto {
    @FarmNameSwagger(true)
    @IsString()
    @IsNotEmpty()
    farmName: string;

    @PropertyCitySwagger(true)
    @IsString()
    @IsNotEmpty()
    city: string;

    @PropertyStateSwagger(true)
    @IsString()
    @IsNotEmpty()
    state: string;

    @TotalAreaSwagger(true)
    @IsNumber()
    @IsNotEmpty()
    totalArea: number;

    @AgriculturalAreaSwagger(true)
    @IsNumber()
    @IsNotEmpty()
    agriculturalArea: number;

    @VegetationAreaSwagger(true)
    @IsNumber()
    @IsNotEmpty()
    vegetationArea: number;

    @PropertyHarvestsSwagger(CreateHarvestDto)
    @IsArray()
    @IsOptional()
    harvests?: CreateHarvestDto[];
}

export class CreateRuralProducerDto {
    @PropertyProducerNameSwagger(true)
    @IsString()
    @IsNotEmpty()
    name: string;

    @PropertyProducerCpfCnpjSwagger(true)
    @IsString()
    @IsNotEmpty()
    cpfCnpj: string;

    @PropertyProducerRuralPropertiesSwagger(CreateRuralPropertyDto)
    @IsArray()
    @IsOptional()
    @ArrayNotEmpty()
    ruralProperties?: CreateRuralPropertyDto[];
}

