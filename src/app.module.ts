import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignAnalyticsModule } from './campaign-analytics/campaign-analytics.module';
import { InvestorInsightsModule } from './investor-insights/investor-insights.module';
import { ReportsModule } from './reports/reports.module';
import { ChartsModule } from './charts/charts.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    CampaignAnalyticsModule,
    InvestorInsightsModule,
    ReportsModule,
    ChartsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
