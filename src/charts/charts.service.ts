import { Injectable } from '@nestjs/common';
import { FileReaderService } from '../common/file-reader.service';

@Injectable()
export class ChartsService {
  constructor(private readonly fileReader: FileReaderService) {}

  generateChartUrl(config: any) {
    const baseUrl = 'https://quickchart.io/chart?c=';
    const encodedConfig = encodeURIComponent(
      JSON.stringify(config),
    );

    return {
      url: `${baseUrl}${encodedConfig}`,
    };
  }

  generateCampaignTrendChart(
    campaignId: number,
    days: number,
  ) {
    const data =
      this.fileReader.readOutputFile(
        'campaign-analytics.json',
      ) || [];

    const today = new Date();
    const cutoff = new Date();
    cutoff.setDate(today.getDate() - days);

    const filtered = data
      .filter(r => {
        const date = new Date(r.analytics_date);
        return (
          r.campaign_id === campaignId &&
          date >= cutoff &&
          date <= today
        );
      })
      .sort((a, b) =>
        a.analytics_date.localeCompare(
          b.analytics_date,
        ),
      );

    const labels = filtered.map(
      r => r.analytics_date,
    );

    const values = filtered.map(
      r => r.funding_progress_percentage,
    );

    const config = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `Campaign ${campaignId} Progress`,
            data: values,
          },
        ],
      },
    };

    return this.generateChartUrl(config);
  }
}
