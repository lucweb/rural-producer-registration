import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducer } from './entity/rural-producer.entity';
import { RuralProperty } from './entity/rural-property.entity';
import { PlantedCulture } from './entity/planted-culture.entity';
import { Harvest } from './entity/harvest.entity';
import { RuralProducerController } from './controllers/rural-producer.controller';
import { RuralProducerService } from './sevices/rural-producer.service';
import { PlantedCultureController } from './controllers/planted-culture.controller';
import { HarvestController } from './controllers/harvest.controller';
import { RuralPropertyController } from './controllers/rural-property.controller';
import { RuralPropertyService } from './sevices/rural-property.service';
import { HarvestService } from './sevices/harvest.service';
import { PlantedCultureService } from './sevices/planted-culture.service';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './sevices/dashboard.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        RuralProducer,
        RuralProperty,
        Harvest,
        PlantedCulture
    ])],
    controllers: [
        RuralProducerController,
        RuralPropertyController,
        HarvestController,
        PlantedCultureController,
        DashboardController,
    ],
    providers: [
        RuralProducerService,
        RuralPropertyService,
        HarvestService,
        PlantedCultureService,
        DashboardService
    ],
    exports: [RuralProducerService]
})
export class RuralProducerModule { }
