import { Injectable } from '@nestjs/common';
import { FileReaderService } from '../common/file-reader.service';
import { CampaignAnalyticsService } from '../campaign-analytics/campaign-analytics.service';
import { InvestorInsightsService } from '../investor-insights/investor-insights.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly fileReader: FileReaderService,
    private readonly campaignService: CampaignAnalyticsService,
    private readonly investorService: InvestorInsightsService,
  ) {}

  generateSampleData() {
    const campaigns =
      this.fileReader.readAssessmentFile('campaigns.json');

    const investors =
      this.fileReader.readAssessmentFile('investors.json');

    const campaignAnalytics: any[] = [];
    const investorInsights: any[] = [];
    const reports: any[] = [];

    const today = new Date();

    // ==========================================
    // 1️⃣ Generate 100 Campaign + Investor Records
    // ==========================================
    for (let i = 0; i < 100; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (i % 90));
      const formattedDate =
        date.toISOString().split('T')[0];

      const campaign =
        campaigns[i % campaigns.length];

      const investor =
        investors[i % investors.length];

      const campaignData =
        this.campaignService.calculateCampaignAnalytics(
          campaign.id,
          formattedDate,
        );

      campaignAnalytics.push({
        id: i + 1,
        ...campaignData,
      });

      const investorData =
        this.investorService.calculateInvestorInsights(
          investor.id,
          formattedDate,
        );

      investorInsights.push({
        id: i + 1,
        ...investorData,
      });
    }

    // ==========================================
    // 2️⃣ Generate 100 Reports
    // ==========================================
    for (let i = 0; i < 100; i++) {
      const reportType =
        i % 2 === 0 ? 'campaign' : 'investor';

      const endDate = new Date(today);
      endDate.setDate(today.getDate() - (i % 30));

      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 30);

      const start =
        startDate.toISOString().split('T')[0];

      const end =
        endDate.toISOString().split('T')[0];

      let summary: any = {};

      if (reportType === 'campaign') {
        const filtered =
          campaignAnalytics.filter(
            r =>
              r.analytics_date >= start &&
              r.analytics_date <= end,
          );

        const uniqueCampaigns = new Set(
          filtered.map(d => d.campaign_id),
        );

        const totalAmount = filtered.reduce(
          (sum, d) =>
            sum + d.total_amount_raised,
          0,
        );

        summary = {
          total_campaigns:
            uniqueCampaigns.size,
          total_amount: Number(
            totalAmount.toFixed(2),
          ),
        };
      } else {
        const filtered =
          investorInsights.filter(
            r =>
              r.insight_date >= start &&
              r.insight_date <= end,
          );

        const uniqueInvestors = new Set(
          filtered.map(d => d.investor_id),
        );

        const totalAmount = filtered.reduce(
          (sum, d) =>
            sum + d.total_investment_amount,
          0,
        );

        summary = {
          total_investors:
            uniqueInvestors.size,
          total_amount: Number(
            totalAmount.toFixed(2),
          ),
        };
      }

      reports.push({
        id: i + 1,
        report_name:
          reportType === 'campaign'
            ? `Campaign Analytics Report ${i + 1}`
            : `Investor Insights Report ${i + 1}`,
        report_type: reportType,
        generated_by: 1,
        report_period_start: start,
        report_period_end: end,
        report_data: {
          summary,
          details: [], // Keep light for seeding
        },
        export_file_url: null,
        generated_at: new Date().toISOString(),
      });
    }

    // ==========================================
    // 3️⃣ Write Output Files
    // ==========================================
    this.fileReader.writeOutputFile(
      'campaign-analytics.json',
      campaignAnalytics,
    );

    this.fileReader.writeOutputFile(
      'investor-insights.json',
      investorInsights,
    );

    this.fileReader.writeOutputFile(
      'analytics-reports.json',
      reports,
    );

    return {
      campaignAnalytics:
        campaignAnalytics.length,
      investorInsights:
        investorInsights.length,
      reports: reports.length,
    };
  }
}
