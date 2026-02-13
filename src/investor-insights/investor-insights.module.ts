import { Module } from '@nestjs/common';
import { InvestorInsightsService } from './investor-insights.service';
import { InvestorInsightsController } from './investor-insights.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [InvestorInsightsController],
  providers: [InvestorInsightsService],
  exports: [InvestorInsightsService],
})
export class InvestorInsightsModule {}
