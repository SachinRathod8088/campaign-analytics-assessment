import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;

  const mockReportsService = {
    generateReport: jest.fn(),
    getReportById: jest.fn(),
    getAllReports: jest.fn(), // ✅ NEW
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        { provide: ReportsService, useValue: mockReportsService },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all reports', () => {
    mockReportsService.getAllReports.mockReturnValue([{ id: 1 }]);
    expect(controller.getAllReports()).toEqual([{ id: 1 }]);
  });
});
