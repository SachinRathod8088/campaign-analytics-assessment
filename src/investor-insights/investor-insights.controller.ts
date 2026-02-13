import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { InvestorInsightsService } from './investor-insights.service';

@Controller('campaign-analytics')
export class InvestorInsightsController {
  constructor(
    private readonly investorService: InvestorInsightsService,
  ) {}

  // ✅ NEW — Get all investor insights
  @Get('investors')
  getAllInvestorInsights() {
    return this.investorService.getAllInvestorInsights();
  }

  // Get single investor insights
  @Get('investor/:investorId')
  getInvestorInsights(@Param('investorId') investorId: string) {
    return this.investorService.calculateInvestorInsights(
      Number(investorId),
      new Date().toISOString().split('T')[0],
    );
  }

  // Top investors
  @Get('investors/top')
  getTopInvestors(@Query('limit') limit: string) {
    const topLimit = limit ? Number(limit) : 10;
    return this.investorService.getTopInvestors(topLimit);
  }

  // ✅ NEW — Calculate investor insights manually
  @Post('investor/:investorId/calculate')
  calculateInvestor(@Param('investorId') investorId: string) {
    return this.investorService.calculateInvestorInsights(
      Number(investorId),
      new Date().toISOString().split('T')[0],
    );
  }
}
