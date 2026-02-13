import { Test, TestingModule } from '@nestjs/testing';
import { CampaignAnalyticsService } from './campaign-analytics.service';
import { FileReaderService } from '../common/file-reader.service';

describe('CampaignAnalyticsService', () => {
  let service: CampaignAnalyticsService;

  const mockFileReader = {
    readAssessmentFile: jest.fn(),
    readOutputFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignAnalyticsService,
        {
          provide: FileReaderService,
          useValue: mockFileReader,
        },
      ],
    }).compile();

    service = module.get<CampaignAnalyticsService>(
      CampaignAnalyticsService,
    );
  });

  it('should calculate campaign analytics correctly', () => {
    mockFileReader.readAssessmentFile
      .mockReturnValueOnce([
        { id: 1, minimum_amt_commitment: 1000000 },
      ]) // campaigns
      .mockReturnValueOnce([
        {
          campaign_id: 1,
          investor_id: 1,
          investment_amount: 500000,
          status: 'invested',
        },
        {
          campaign_id: 1,
          investor_id: 2,
          investment_amount: 200000,
          status: 'invested',
        },
      ]); // transactions

    const result = service.calculateCampaignAnalytics(
      1,
      '2026-01-01',
    );

    expect(result.total_investors).toBe(2);
    expect(result.total_amount_raised).toBe(700000);
    expect(result.funding_progress_percentage).toBe(70);
  });
});
