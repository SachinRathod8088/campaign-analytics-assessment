import { Test, TestingModule } from '@nestjs/testing';
import { CampaignAnalyticsController } from './campaign-analytics.controller';
import { CampaignAnalyticsService } from './campaign-analytics.service';

describe('CampaignAnalyticsController', () => {
  let controller: CampaignAnalyticsController;

  const mockService = {
    calculateCampaignAnalytics: jest.fn(),
    getCampaignTrends: jest.fn(),
    getAllCampaignAnalytics: jest.fn(), // ✅ NEW
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignAnalyticsController],
      providers: [
        { provide: CampaignAnalyticsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<CampaignAnalyticsController>(
      CampaignAnalyticsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all campaign analytics', () => {
    mockService.getAllCampaignAnalytics.mockReturnValue([{ id: 1 }]);
    expect(controller.getAllCampaignAnalytics()).toEqual([{ id: 1 }]);
  });
});
