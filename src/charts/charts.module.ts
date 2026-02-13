import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule], // Needed for FileReaderService
  providers: [ChartsService],
  controllers: [ChartsController],
})
export class ChartsModule {}
