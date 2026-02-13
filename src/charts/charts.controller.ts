import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ChartsService } from './charts.service';

@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  // POST /charts/generate
  @Post('generate')
  generateChart(@Body() config: any) {
    return this.chartsService.generateChartUrl(config);
  }

  // GET /charts/campaign/:campaignId?days=30
  @Get('campaign/:campaignId')
  generateCampaignChart(
    @Param('campaignId') campaignId: string,
    @Query('days') days: string,
  ) {
    const numberOfDays = days ? Number(days) : 30;

    return this.chartsService.generateCampaignTrendChart(
      Number(campaignId),
      numberOfDays,
    );
  }
}
