import {
    Controller,
    Get,
    Delete,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { HarvestService } from '../sevices/harvest.service';
import { Harvest } from '../entity/harvest.entity';
import {
    ControllerHarvestSwagger,
    DeleteHarvestSwagger,
    SearchHarvestByIdSwagger,
} from '../swagger-docs/harvest.swagger';

@ControllerHarvestSwagger()
@Controller('rural-producer/harvest')
export class HarvestController {
    constructor(private readonly service: HarvestService) { }

    @SearchHarvestByIdSwagger()
    @Get(':id')
    async searchById(@Param('id') id: string): Promise<Harvest> {
        return this.service.searchById(id);
    }

    @DeleteHarvestSwagger()
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
