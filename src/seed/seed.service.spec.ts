import { Test } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { FileReaderService } from '../common/file-reader.service';
import { CampaignAnalyticsService } from '../campaign-analytics/campaign-analytics.service';
import { InvestorInsightsService } from '../investor-insights/investor-insights.service';
import { ReportsService } from '../reports/reports.service';

describe('SeedService', () => {
  let service: SeedService;

  const mockFileReader = {
    readAssessmentFile: jest.fn()
      .mockReturnValueOnce([{ id: 1 }]) // campaigns
      .mockReturnValueOnce([{ id: 1 }]) // investors
      .mockReturnValue([]),
    writeOutputFile: jest.fn(),
  };

  const mockCampaignService = {
    calculateCampaignAnalytics: jest.fn().mockReturnValue({
      campaign_id: 1,
      analytics_date: '2026-01-01',
      total_investors: 1,
      total_amount_raised: 100,
      average_investment_amount: 100,
      funding_progress_percentage: 10,
      campaign_performance_score: 10,
    }),
  };

  const mockInvestorService = {
    calculateInvestorInsights: jest.fn().mockReturnValue({
      investor_id: 1,
      insight_date: '2026-01-01',
      total_investments: 1,
      total_investment_amount: 100,
      average_investment_amount: 100,
      preferred_sector: 'Fin-tech',
      engagement_score: 10,
      investor_segment: 'regular',
      last_investment_date: '2026-01-01',
    }),
  };

  const mockReportsService = {
    generateReport: jest.fn().mockReturnValue({
      id: 1,
      report_type: 'campaign',
      report_data: { summary: {}, details: [] },
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SeedService,
        { provide: FileReaderService, useValue: mockFileReader },
        { provide: CampaignAnalyticsService, useValue: mockCampaignService },
        { provide: InvestorInsightsService, useValue: mockInvestorService },
        { provide: ReportsService, useValue: mockReportsService },
      ],
    }).compile();

    service = module.get(SeedService);
  });

  it('should generate sample data', () => {
    const result = service.generateSampleData();

    expect(result.campaignAnalytics).toBe(100);
    expect(result.investorInsights).toBe(100);
    expect(result.reports).toBe(100);
  });
});
