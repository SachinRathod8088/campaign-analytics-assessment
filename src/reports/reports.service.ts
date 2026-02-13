import { Injectable, NotFoundException } from '@nestjs/common';
import { FileReaderService } from '../common/file-reader.service';

@Injectable()
export class ReportsService {
  constructor(private readonly fileReader: FileReaderService) {}

  // ✅ NEW — Get all reports
  getAllReports() {
    return this.fileReader.readOutputFile('analytics-reports.json');
  }

  generateReport(
    reportType: 'campaign' | 'investor',
    startDate: string,
    endDate: string,
  ) {
    let data: any[] = [];
    let summary: any = {};

    if (reportType === 'campaign') {
      data = this.fileReader.readOutputFile('campaign-analytics.json');

      const filtered = data.filter(
        r =>
          r.analytics_date >= startDate &&
          r.analytics_date <= endDate,
      );

      const uniqueCampaigns = new Set(
        filtered.map(r => r.campaign_id),
      );

      const totalAmount = filtered.reduce(
        (sum, r) => sum + r.total_amount_raised,
        0,
      );

      summary = {
        total_campaigns: uniqueCampaigns.size,
        total_amount: Number(totalAmount.toFixed(2)),
      };

      data = filtered;
    } else {
      data = this.fileReader.readOutputFile('investor-insights.json');

      const filtered = data.filter(
        r =>
          r.insight_date >= startDate &&
          r.insight_date <= endDate,
      );

      const uniqueInvestors = new Set(
        filtered.map(r => r.investor_id),
      );

      const totalAmount = filtered.reduce(
        (sum, r) => sum + r.total_investment_amount,
        0,
      );

      summary = {
        total_investors: uniqueInvestors.size,
        total_amount: Number(totalAmount.toFixed(2)),
      };

      data = filtered;
    }

    const report = {
      id: Date.now(),
      report_name:
        reportType === 'campaign'
          ? `Campaign Analytics Report`
          : `Investor Insights Report`,
      report_type: reportType,
      generated_by: 1,
      report_period_start: startDate,
      report_period_end: endDate,
      report_data: {
        summary,
        details: data,
      },
      export_file_url: null,
      generated_at: new Date().toISOString(),
    };

    return report;
  }

  getReportById(reportId: number) {
    const reports =
      this.fileReader.readOutputFile(
        'analytics-reports.json',
      );

    const report = reports.find(
      r => r.id === reportId,
    );

    if (!report) {
      throw new NotFoundException(
        'Report not found',
      );
    }

    return report;
  }
}
