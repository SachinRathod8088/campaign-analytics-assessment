import { Test, TestingModule } from '@nestjs/testing';
import { ChartsController } from './charts.controller';
import { ChartsService } from './charts.service';

describe('ChartsController', () => {
  let controller: ChartsController;

  const mockService = {
    generateChartUrl: jest.fn(),
    generateCampaignTrendChart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartsController],
      providers: [
        { provide: ChartsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ChartsController>(ChartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate chart url', () => {
    mockService.generateChartUrl.mockReturnValue({ url: 'test-url' });

    const result = controller.generateChart({ type: 'bar' });

    expect(result).toEqual({ url: 'test-url' });
  });

  it('should generate campaign trend chart', () => {
    mockService.generateCampaignTrendChart.mockReturnValue({ url: 'trend-url' });

    const result = controller.generateCampaignChart('1', '30');

    expect(result).toEqual({ url: 'trend-url' });
  });
});
