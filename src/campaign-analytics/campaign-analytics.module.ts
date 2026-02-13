import { Module } from '@nestjs/common';
import { CampaignAnalyticsService } from './campaign-analytics.service';
import { CampaignAnalyticsController } from './campaign-analytics.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CampaignAnalyticsController],
  providers: [CampaignAnalyticsService],
  exports: [CampaignAnalyticsService],
})
export class CampaignAnalyticsModule {}
