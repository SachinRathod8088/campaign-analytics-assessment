import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { CampaignAnalyticsService } from './campaign-analytics.service';

@Controller('campaign-analytics')
export class CampaignAnalyticsController {
  constructor(
    private readonly campaignService: CampaignAnalyticsService,
  ) {}

  // ✅ NEW — Get all campaign analytics
  @Get()
  getAllCampaignAnalytics() {
    return this.campaignService.getAllCampaignAnalytics();
  }

  // Get single campaign analytics
  @Get('campaign/:campaignId')
  getCampaignAnalytics(@Param('campaignId') campaignId: string) {
    return this.campaignService.calculateCampaignAnalytics(
      Number(campaignId),
      new Date().toISOString().split('T')[0],
    );
  }

  // Campaign trends
  @Get('campaign/:campaignId/trends')
  getCampaignTrends(
    @Param('campaignId') campaignId: string,
    @Query('days') days: string,
  ) {
    const numberOfDays = days ? Number(days) : 30;

    return this.campaignService.getCampaignTrends(
      Number(campaignId),
      numberOfDays,
    );
  }

  // Calculate campaign analytics manually
  @Post('campaign/:campaignId/calculate')
  calculateCampaign(@Param('campaignId') campaignId: string) {
    return this.campaignService.calculateCampaignAnalytics(
      Number(campaignId),
      new Date().toISOString().split('T')[0],
    );
  }
}
