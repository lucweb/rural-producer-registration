import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { RuralProducer } from './../entity/rural-producer.entity';
import { CreateRuralProducerDto } from './../dto/create-producer.dto';
import { UpdateProducerDto } from './../dto/update-producer.dto';
import {
    ControllerRuralProducerSwagger,
    CreateProducerSwagger,
    DeleteProducerSwagger,
    ListAllProducersSwagger,
    SearchProducerByIdSwagger,
    UpdateProducerSwagger
} from './../swagger-docs/rural-producer.swagger';
import { RuralProducerService } from '../sevices/rural-producer.service';

@ControllerRuralProducerSwagger()
@Controller('rural-producer')
export class RuralProducerController {
    constructor(private readonly producerService: RuralProducerService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @CreateProducerSwagger()
    async createProduce(@Body() CreateRuralProducerDto: CreateRuralProducerDto): Promise<RuralProducer> {
        return this.producerService.create(CreateRuralProducerDto);
    }

    @Get()
    @ListAllProducersSwagger()
    async listAll(): Promise<RuralProducer[]> {
        return this.producerService.listAll();
    }

    @Get(':id')
    @SearchProducerByIdSwagger()
    async searchById(@Param('id') id: string): Promise<RuralProducer> {
        return this.producerService.searchById(id);
    }

    @Put(':id')
    @UpdateProducerSwagger()
    async updateProducer(
        @Param('id') id: string,
        @Body() updateProducerDto: UpdateProducerDto,
    ): Promise<RuralProducer> {
        return this.producerService.update(id, updateProducerDto);
    }

    @Delete(':id')
    @DeleteProducerSwagger()
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProducer(@Param('id') id: string): Promise<void> {
        return this.producerService.delete(id);
    }
}
