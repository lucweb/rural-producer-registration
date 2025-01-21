import {
    Controller,
    Get,
    Delete,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ControllerRuralPropertySwagger,
    DeletePropertySwagger,
    SearchPropertyByIdSwagger
} from '../swagger-docs/rural-property.swagger';
import { RuralPropertyService } from '../sevices/rural-property.service';
import { RuralProperty } from '../entity/rural-property.entity';

@ControllerRuralPropertySwagger()
@Controller('rural-producer/rural-property')
export class RuralPropertyController {
    constructor(private readonly service: RuralPropertyService) { }

    @SearchPropertyByIdSwagger()
    @Get(':id')
    async searchById(@Param('id') id: string): Promise<RuralProperty> {
        return this.service.searchById(id);
    }

    @DeletePropertySwagger()
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProducer(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
