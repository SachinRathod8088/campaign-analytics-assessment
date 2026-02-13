import { FormulaHelper } from './formula.helper';

describe('FormulaHelper', () => {

  it('should calculate campaign performance correctly', () => {
    const result = FormulaHelper.campaignPerformance(
      500000,   // raised
      1000000,  // commitment
      10,       // investors
    );

    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('should cap campaign performance at 100', () => {
    const result = FormulaHelper.campaignPerformance(
      2000000,  // exceeds commitment
      1000000,
      100,
    );

    expect(result).toBeLessThanOrEqual(100);
  });

  it('should calculate investor engagement correctly', () => {
    const result = FormulaHelper.investorEngagement(
      5,
      1000000,
    );

    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('should cap investor engagement at 100', () => {
    const result = FormulaHelper.investorEngagement(
      50,
      10000000,
    );

    expect(result).toBeLessThanOrEqual(100);
  });

  it('should return whale segment', () => {
    const segment = FormulaHelper.investorSegment(
      1,
      5000000,
    );
    expect(segment).toBe('whale');
  });

  it('should return regular segment', () => {
    const segment = FormulaHelper.investorSegment(
      6,
      2000000,
    );
    expect(segment).toBe('regular');
  });

  it('should return occasional segment', () => {
    const segment = FormulaHelper.investorSegment(
      2,
      100000,
    );
    expect(segment).toBe('occasional');
  });

  it('should return new segment', () => {
    const segment = FormulaHelper.investorSegment(
      1,
      100000,
    );
    expect(segment).toBe('new');
  });

});
