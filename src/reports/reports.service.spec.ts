import { Test } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { FileReaderService } from '../common/file-reader.service';

describe('ReportsService', () => {
  let service: ReportsService;

  const mockFileReader = {
    readOutputFile: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: FileReaderService,
          useValue: mockFileReader,
        },
      ],
    }).compile();

    service = module.get(ReportsService);
  });

  it('should generate campaign report', () => {
    mockFileReader.readOutputFile.mockReturnValue([
      {
        campaign_id: 1,
        analytics_date: '2026-01-01',
        total_amount_raised: 100000,
      },
    ]);

    const result =
      service.generateReport(
        'campaign',
        '2026-01-01',
        '2026-01-30',
      );

    expect(result.report_data.summary.total_campaigns).toBe(
      1,
    );
    expect(result.report_data.summary.total_amount).toBe(
      100000,
    );
  });

  it('should return all reports', () => {
    mockFileReader.readOutputFile.mockReturnValue([
      { id: 1 },
    ]);

    const result = service.getAllReports();

    expect(result).toEqual([{ id: 1 }]);
  });
});
