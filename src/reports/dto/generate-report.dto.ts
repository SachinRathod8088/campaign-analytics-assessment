import { IsIn, IsDateString } from 'class-validator';

export class GenerateReportDto {
  @IsIn(['campaign', 'investor'])
  report_type: 'campaign' | 'investor';

  @IsDateString()
  report_period_start: string;

  @IsDateString()
  report_period_end: string;
}
