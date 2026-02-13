import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

describe('SeedController', () => {
  let controller: SeedController;

  const mockService = {
    generateSampleData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        { provide: SeedService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call generateSampleData via GET', () => {
    mockService.generateSampleData.mockReturnValue({
      campaignAnalytics: 100,
      investorInsights: 100,
      reports: 100,
    });

    const result = controller.seedDataGet();

    expect(result).toEqual({
      campaignAnalytics: 100,
      investorInsights: 100,
      reports: 100,
    });

    expect(mockService.generateSampleData).toHaveBeenCalled();
  });

  it('should call generateSampleData via POST', () => {
    mockService.generateSampleData.mockReturnValue({
      campaignAnalytics: 100,
      investorInsights: 100,
      reports: 100,
    });

    const result = controller.seedDataPost();

    expect(result).toEqual({
      campaignAnalytics: 100,
      investorInsights: 100,
      reports: 100,
    });

    expect(mockService.generateSampleData).toHaveBeenCalled();
  });
});
