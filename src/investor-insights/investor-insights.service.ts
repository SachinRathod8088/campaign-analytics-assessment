import { Injectable, NotFoundException } from '@nestjs/common';
import { FileReaderService } from '../common/file-reader.service';
import { FormulaHelper } from '../common/formula.helper';

@Injectable()
export class InvestorInsightsService {
  constructor(private readonly fileReader: FileReaderService) {}

  // ✅ NEW — Get all investor insights from output file
  getAllInvestorInsights() {
    return this.fileReader.readOutputFile('investor-insights.json');
  }

  calculateInvestorInsights(investorId: number, insightDate: string) {
    const investors = this.fileReader.readAssessmentFile('investors.json');
    const transactions = this.fileReader.readAssessmentFile('transactions.json');
    const campaigns = this.fileReader.readAssessmentFile('campaigns.json');
    const startups = this.fileReader.readAssessmentFile('startups.json');

    const investor = investors.find(i => i.id === investorId);
    if (!investor) {
      throw new NotFoundException('Investor not found');
    }

    const investedTransactions = transactions.filter(
      t => t.investor_id === investorId && t.status === 'invested',
    );

    const totalInvestments = investedTransactions.length;

    const totalInvestmentAmount = investedTransactions.reduce(
      (sum, t) => sum + t.investment_amount,
      0,
    );

    const averageInvestment =
      totalInvestments > 0
        ? totalInvestmentAmount / totalInvestments
        : 0;

    // Preferred Sector calculation
    const sectorCount: Record<string, number> = {};

    investedTransactions.forEach(transaction => {
      const campaign = campaigns.find(
        c => c.id === transaction.campaign_id,
      );
      if (!campaign) return;

      const startup = startups.find(
        s => s.id === campaign.startup_id,
      );
      if (!startup) return;

      const sector = startup.sector || 'General';
      sectorCount[sector] =
        (sectorCount[sector] || 0) + 1;
    });

    let preferredSector = 'General';
    let maxCount = 0;

    for (const sector in sectorCount) {
      if (sectorCount[sector] > maxCount) {
        maxCount = sectorCount[sector];
        preferredSector = sector;
      }
    }

    const engagementScore =
      FormulaHelper.investorEngagement(
        totalInvestments,
        totalInvestmentAmount,
      );

    const investorSegment =
      FormulaHelper.investorSegment(
        totalInvestments,
        totalInvestmentAmount,
      );

    const lastInvestmentDate =
      investedTransactions.length > 0
        ? investedTransactions
            .map(t => t.investment_at)
            .sort()
            .pop()
        : null;

    return {
      investor_id: investorId,
      insight_date: insightDate,
      total_investments: totalInvestments,
      total_investment_amount: Number(
        totalInvestmentAmount.toFixed(2),
      ),
      average_investment_amount: Number(
        averageInvestment.toFixed(2),
      ),
      preferred_sector: preferredSector,
      engagement_score: Number(
        engagementScore.toFixed(2),
      ),
      investor_segment: investorSegment,
      last_investment_date: lastInvestmentDate,
    };
  }

  // Top Investors
  getTopInvestors(limit: number) {
    const data =
      this.fileReader.readOutputFile(
        'investor-insights.json',
      );

    return data
      .sort(
        (a, b) =>
          b.total_investment_amount -
          a.total_investment_amount,
      )
      .slice(0, limit);
  }
}
