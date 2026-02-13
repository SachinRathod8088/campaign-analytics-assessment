export class FormulaHelper {

  /**
   * Formula 1: Campaign Performance Score
   */
  static campaignPerformance(
    totalAmount: number,
    minCommitment: number,
    totalInvestors: number,
  ): number {

    const fundingProgress =
      minCommitment > 0
        ? (totalAmount / minCommitment) * 100
        : 0;

    const investorComponent =
      Math.min((totalInvestors / 50) * 100, 100);

    const rawScore =
      fundingProgress * 0.6 +
      investorComponent * 0.4;

    return Math.min(
      Math.max(rawScore, 0),
      100,
    );
  }

  /**
   * Formula 2: Investor Engagement Score
   */
  static investorEngagement(
    totalInvestments: number,
    totalAmount: number,
  ): number {

    const countComponent =
      Math.min(totalInvestments / 10, 1) * 50;

    const amountComponent =
      Math.min(totalAmount / 1_000_000, 1) * 50;

    const score =
      countComponent + amountComponent;

    return Math.min(
      Math.max(score, 0),
      100,
    );
  }

  /**
   * Formula 3: Investor Segment
   */
  static investorSegment(
    totalInvestments: number,
    totalAmount: number,
  ): 'whale' | 'regular' | 'occasional' | 'new' {

    if (totalAmount >= 5_000_000) return 'whale';
    if (totalInvestments >= 5) return 'regular';
    if (totalInvestments >= 2) return 'occasional';
    return 'new';
  }
}
