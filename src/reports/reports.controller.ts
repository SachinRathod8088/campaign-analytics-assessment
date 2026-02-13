import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GenerateReportDto } from './dto/generate-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /**
   * GET /reports
   * Returns all generated reports from output file
   */
  @Get()
  getAllReports() {
    return this.reportsService.getAllReports();
  }

  /**
   * POST /reports/generate
   * Generates a new campaign or investor report
   */
  @Post('generate')
  generateReport(@Body() body: GenerateReportDto) {
    return this.reportsService.generateReport(
      body.report_type,
      body.report_period_start,
      body.report_period_end,
    );
  }

  /**
   * GET /reports/:reportId
   * Returns a single report by ID
   */
  @Get(':reportId')
  getReport(@Param('reportId') reportId: string) {
    return this.reportsService.getReportById(Number(reportId));
  }
}
