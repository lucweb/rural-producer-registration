import {
    Controller,
    Get,
    Delete,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { 
    ControllerPlantedCultureSwagger, 
    SearchPlantedCultureByIdSwagger,
    DeletePlantedCultureSwagger,
} from '../swagger-docs/planted-culture.swagger';
import { PlantedCulture } from '../entity/planted-culture.entity';
import { PlantedCultureService } from '../sevices/planted-culture.service';

@ControllerPlantedCultureSwagger()
@Controller('rural-producer/planted-culture')
export class PlantedCultureController {
    constructor(private readonly service: PlantedCultureService) { }

    @SearchPlantedCultureByIdSwagger()
    @Get(':id')
    async searchById(@Param('id') id: string): Promise<PlantedCulture> {
        return this.service.searchById(id);
    }

    @DeletePlantedCultureSwagger()
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProducer(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
