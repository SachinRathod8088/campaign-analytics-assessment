import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CampaignAnalyticsModule } from '../campaign-analytics/campaign-analytics.module';
import { InvestorInsightsModule } from '../investor-insights/investor-insights.module';
import { ReportsModule } from '../reports/reports.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    CommonModule,
    CampaignAnalyticsModule,
    InvestorInsightsModule,
    ReportsModule, // ✅ Added for report generation
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
