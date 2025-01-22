import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantedCulture } from '../entity/planted-culture.entity';
import { RuralProperty } from '../entity/rural-property.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly ruralPropertyRepository: Repository<RuralProperty>,

    @InjectRepository(PlantedCulture)
    private readonly cultureRepository: Repository<PlantedCulture>
  ) {}

  async getTotalFarms(): Promise<number> {
    return this.ruralPropertyRepository.count();
  }

  async getTotalHectares(): Promise<number> {
    const result = await this.ruralPropertyRepository
      .createQueryBuilder('rural_property')
      .select('SUM(rural_property.totalArea)', 'totalArea')
      .getRawOne();

    return parseFloat(result.totalArea) || 0;
  }

  async getFarmsByState(): Promise<{ state: string; count: number }[]> {
    return this.ruralPropertyRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .groupBy('farm.state')
      .getRawMany();
  }

  async getFarmsByCulture(): Promise<{ culture: string; count: number }[]> {
    return this.cultureRepository
      .createQueryBuilder('culture')
      .leftJoin('culture.harvests', 'harvest')
      .select('culture.name', 'culture')
      .addSelect('COUNT(*)', 'count')
      .groupBy('culture.name')
      .getRawMany();
  }

  async getLandUsage(): Promise<{ type: string; area: number }[]> {
    const result = await this.ruralPropertyRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.agriculturalArea)', 'agriculturalArea')
      .addSelect('SUM(farm.vegetationArea)', 'vegetationArea')
      .getRawOne();

    return [
      { type: 'Agricultural Area', area: parseFloat(result.agriculturalArea) || 0 },
      { type: 'Vegetation Area', area: parseFloat(result.vegetationArea) || 0 },
    ];
  }

  async getDashboardData() {
    const [totalFarms, totalHectares, farmsByState, farmsByCulture, landUsage] = await Promise.all([
      this.getTotalFarms(),
      this.getTotalHectares(),
      this.getFarmsByState(),
      this.getFarmsByCulture(),
      this.getLandUsage(),
    ]);

    return {
      totalFarms,
      totalHectares,
      farmsByState,
      farmsByCulture,
      landUsage,
    };
  }
}