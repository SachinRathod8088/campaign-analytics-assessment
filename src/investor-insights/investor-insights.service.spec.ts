import { Test, TestingModule } from '@nestjs/testing';
import { InvestorInsightsService } from './investor-insights.service';
import { FileReaderService } from '../common/file-reader.service';

describe('InvestorInsightsService', () => {
  let service: InvestorInsightsService;

  const mockFileReader = {
    readAssessmentFile: jest.fn(),
    readOutputFile: jest.fn(), // ✅ Added for new endpoint
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          InvestorInsightsService,
          {
            provide: FileReaderService,
            useValue: mockFileReader,
          },
        ],
      }).compile();

    service = module.get<InvestorInsightsService>(
      InvestorInsightsService,
    );
  });

  it('should calculate investor insights correctly', () => {
    mockFileReader.readAssessmentFile
      .mockReturnValueOnce([{ id: 1 }]) // investors
      .mockReturnValueOnce([
        {
          investor_id: 1,
          campaign_id: 1,
          investment_amount: 500000,
          status: 'invested',
          investment_at: '2026-01-01',
        },
      ]) // transactions
      .mockReturnValueOnce([{ id: 1, startup_id: 1 }]) // campaigns
      .mockReturnValueOnce([
        { id: 1, sector: 'Fin-tech' },
      ]); // startups

    const result =
      service.calculateInvestorInsights(
        1,
        '2026-01-01',
      );

    expect(result.total_investments).toBe(1);
    expect(result.total_investment_amount).toBe(
      500000,
    );
    expect(result.preferred_sector).toBe(
      'Fin-tech',
    );
  });

  it('should return all investor insights from output file', () => {
    mockFileReader.readOutputFile.mockReturnValue([
      { id: 1 },
    ]);

    const result =
      service.getAllInvestorInsights();

    expect(result).toEqual([{ id: 1 }]);
  });
});
