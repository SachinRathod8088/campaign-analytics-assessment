import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule], // ✅ Needed if ReportsService uses FileReaderService
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService], // ✅ Useful for SeedService reuse
})
export class ReportsModule {}
