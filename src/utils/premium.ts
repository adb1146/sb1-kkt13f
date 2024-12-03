import { PayrollInfo, PremiumModifiers, PremiumBreakdown, RateInfo } from '../types';

const sampleRates: RateInfo[] = [
  { stateCode: 'CA', classCode: '8810', baseRate: 0.37 },
  { stateCode: 'CA', classCode: '8742', baseRate: 0.45 },
  { stateCode: 'NY', classCode: '8810', baseRate: 0.28 },
  { stateCode: 'NY', classCode: '8742', baseRate: 0.35 },
];

export function getBaseRate(stateCode: string, classCode: string): number {
  const rate = sampleRates.find(
    (r) => r.stateCode === stateCode && r.classCode === classCode
  );
  return rate?.baseRate || 0;
}

export function calculateManualPremium(payroll: number, rate: number): number {
  return (payroll / 100) * rate;
}

export function applyModifiers(
  manualPremium: number,
  modifiers: PremiumModifiers
): number {
  const { experienceMod, scheduleCredit, safetyCredit } = modifiers;
  let premium = manualPremium;

  // Apply experience modification factor
  premium *= experienceMod;

  // Apply schedule credit/debit
  premium *= (1 - scheduleCredit);

  // Apply safety credit
  premium *= (1 - safetyCredit);

  // Add supplemental coverage premiums if selected
  if (modifiers.supplementalCoverages) {
    const supplementalPremium = modifiers.supplementalCoverages
      .filter(coverage => coverage.selected)
      .reduce((sum, coverage) => sum + coverage.premium, 0);
    premium += supplementalPremium;
  }

  return premium;
}

export function calculateStatePremium(
  payrollInfo: PayrollInfo[],
  modifiers: PremiumModifiers,
  stateCode: string
): PremiumBreakdown[] {
  return payrollInfo
    .filter((info) => info.stateCode === stateCode)
    .map((info) => {
      const baseRate = getBaseRate(info.stateCode, info.classCode);
      const manualPremium = calculateManualPremium(info.annualPayroll, baseRate);
      const modifiedPremium = applyModifiers(manualPremium, modifiers);

      return {
        stateCode: info.stateCode,
        classCode: info.classCode,
        payroll: info.annualPayroll,
        baseRate,
        manualPremium,
        modifiedPremium,
        finalPremium: modifiedPremium,
      };
    });
}

export function calculateTotalPremium(breakdowns: PremiumBreakdown[]): number {
  return breakdowns.reduce((total, breakdown) => total + breakdown.finalPremium, 0);
}