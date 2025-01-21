import { IsString, IsOptional, IsUUID, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import {
    AgriculturalAreaSwagger,
    FarmNameSwagger,
    IdRuralPropertySwagger,
    PropertyCitySwagger,
    PropertyCulturesSwagger,
    PropertyHarvestsSwagger,
    PropertyIdSwagger,
    PropertyNameSwagger,
    PropertyPlantedCultureIdSwagger,
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

export class UpdatePlantedCultureDto {
    @PropertyPlantedCultureIdSwagger()
    @IsUUID()
    @IsOptional()
    id?: string;

    @PropertyPlantedCultureNameSwagger()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @PropertyPlantedCultureQuantityPlantedSwagger()
    @IsNumber()
    @IsOptional()
    quantityPlanted?: number;
}

export class UpdateHarvestDto {
    @IsUUID()
    @IsOptional()
    @PropertyIdSwagger()
    id?: string;

    @IsString()
    @IsOptional()
    @PropertyNameSwagger()
    nome?: string;

    @IsNumber()
    @IsOptional()
    @PropertyYearSwagger()
    year?: number;

    @IsNumber()
    @IsOptional()
    @PropertyTotalAreaSwagger()
    totalArea?: number;

    @PropertyCulturesSwagger(UpdatePlantedCultureDto)
    @IsArray()
    @IsOptional()
    cultures?: UpdatePlantedCultureDto[];
}

export class UpdateRuralPropertyDto {
    @IdRuralPropertySwagger()
    @IsUUID()
    @IsOptional()
    id?: string;

    @FarmNameSwagger()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    farmName?: string;

    @PropertyCitySwagger()
    @IsString()
    @IsOptional()
    city?: string;

    @PropertyStateSwagger()
    @IsString()
    @IsOptional()
    state?: string;

    @TotalAreaSwagger()
    @IsNumber()
    @IsOptional()
    totalArea?: number;

    @AgriculturalAreaSwagger()
    @IsNumber()
    @IsOptional()
    agriculturalArea?: number;

    @VegetationAreaSwagger()
    @IsNumber()
    @IsOptional()
    vegetationArea?: number;

    @PropertyHarvestsSwagger(UpdateHarvestDto)
    @IsArray()
    @IsOptional()
    harvests?: UpdateHarvestDto[];
}

export class UpdateProducerDto {
    @PropertyProducerNameSwagger()
    @IsString()
    @IsNotEmpty()
    name: string;

    @PropertyProducerCpfCnpjSwagger()
    @IsString()
    @IsNotEmpty()
    cpfCnpj: string;

    @PropertyProducerRuralPropertiesSwagger(UpdateRuralPropertyDto)
    @IsArray()
    @IsOptional()
    ruralProperties?: UpdateRuralPropertyDto[];
}