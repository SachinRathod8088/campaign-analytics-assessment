import { Test, TestingModule } from '@nestjs/testing';
import { InvestorInsightsController } from './investor-insights.controller';
import { InvestorInsightsService } from './investor-insights.service';

describe('InvestorInsightsController', () => {
  let controller: InvestorInsightsController;

  const mockService = {
    calculateInvestorInsights: jest.fn(),
    getTopInvestors: jest.fn(),
    getAllInvestorInsights: jest.fn(), // ✅ NEW
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorInsightsController],
      providers: [
        { provide: InvestorInsightsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<InvestorInsightsController>(
      InvestorInsightsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all investor insights', () => {
    mockService.getAllInvestorInsights.mockReturnValue([{ id: 1 }]);
    expect(controller.getAllInvestorInsights()).toEqual([{ id: 1 }]);
  });
});
