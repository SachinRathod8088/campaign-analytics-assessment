import { ChartsService } from './charts.service';

describe('ChartsService', () => {
  let service: ChartsService;

  beforeEach(() => {
    service = new ChartsService({} as any);
  });

  it('should generate chart url', () => {
    const config = { type: 'bar', data: {} };

    const result = service.generateChartUrl(config);

    expect(result.url).toContain('https://quickchart.io/chart');
  });
});
