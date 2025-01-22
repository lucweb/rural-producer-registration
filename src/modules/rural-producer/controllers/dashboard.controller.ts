import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from '../sevices/dashboard.service';
import {
    ControllerDashboardSwagger,
    GetDashboardDataSwagger,
    GetFarmsByCultureSwagger,
    GetFarmsByStateSwagger,
    GetLandUsageSwagger,
    GetTotalFarmsSwagger,
    GetTotalHectaresSwagger,
} from '../swagger-docs/dashboard.swagger';

@ControllerDashboardSwagger()
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('/total-farms')
    @GetTotalFarmsSwagger()
    async getTotalFarms() {
        return this.dashboardService.getTotalFarms();
    }

    @Get('/total-hectares')
    @GetTotalHectaresSwagger()
    async getTotalHectares() {
        return this.dashboardService.getTotalHectares();
    }

    @Get('/farms-by-state')
    @GetFarmsByStateSwagger()
    async getFarmsByState() {
        return this.dashboardService.getFarmsByState();
    }

    @Get('/farms-by-culture')
    @GetFarmsByCultureSwagger()
    async getFarmsByCulture() {
        return this.dashboardService.getFarmsByCulture();
    }

    @Get('/land-usage')
    @GetLandUsageSwagger()
    async getLandUsage() {
        return this.dashboardService.getLandUsage();
    }

    @Get()
    @GetDashboardDataSwagger()
    async getDashboardData() {
        return this.dashboardService.getDashboardData();
    }
}
