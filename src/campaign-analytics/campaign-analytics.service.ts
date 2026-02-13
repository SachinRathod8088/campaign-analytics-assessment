import { Injectable, NotFoundException } from '@nestjs/common';
import { FileReaderService } from '../common/file-reader.service';
import { FormulaHelper } from '../common/formula.helper';

@Injectable()
export class CampaignAnalyticsService {
  constructor(private readonly fileReader: FileReaderService) {}

  // ✅ NEW — Get all analytics from output file
  getAllCampaignAnalytics() {
    return this.fileReader.readOutputFile('campaign-analytics.json');
  }

  calculateCampaignAnalytics(campaignId: number, analyticsDate: string) {
    const campaigns = this.fileReader.readAssessmentFile('campaigns.json');
    const transactions = this.fileReader.readAssessmentFile('transactions.json');

    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const investedTransactions = transactions.filter(
      t => t.campaign_id === campaignId && t.status === 'invested',
    );

    const totalAmountRaised = investedTransactions.reduce(
      (sum, t) => sum + t.investment_amount,
      0,
    );

    const uniqueInvestors = new Set(
      investedTransactions.map(t => t.investor_id),
    );

    const totalInvestors = uniqueInvestors.size;

    const averageInvestment =
      totalInvestors > 0
        ? totalAmountRaised / totalInvestors
        : 0;

    const fundingProgress =
      campaign.minimum_amt_commitment > 0
        ? (totalAmountRaised / campaign.minimum_amt_commitment) * 100
        : 0;

    const performanceScore = FormulaHelper.campaignPerformance(
      totalAmountRaised,
      campaign.minimum_amt_commitment,
      totalInvestors,
    );

    return {
      campaign_id: campaignId,
      analytics_date: analyticsDate,
      total_investors: totalInvestors,
      total_amount_raised: Number(totalAmountRaised.toFixed(2)),
      average_investment_amount: Number(averageInvestment.toFixed(2)),
      funding_progress_percentage: Number(fundingProgress.toFixed(2)),
      campaign_performance_score: Number(performanceScore.toFixed(2)),
    };
  }

  // Campaign Trends
  getCampaignTrends(campaignId: number, days: number) {
    const data = this.fileReader.readOutputFile('campaign-analytics.json');

    const today = new Date();
    const cutoff = new Date();
    cutoff.setDate(today.getDate() - days);

    return data.filter(r => {
      const date = new Date(r.analytics_date);
      return (
        r.campaign_id === campaignId &&
        date >= cutoff &&
        date <= today
      );
    });
  }
}
