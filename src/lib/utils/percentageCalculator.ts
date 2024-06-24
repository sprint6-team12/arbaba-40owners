export default function percentageCalculator(
  hourlyPay: number,
  originalHourlyPay: number
) {
  const percentage =
    ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
  const roundedPercentage = Math.round(percentage / 10) * 10;
  return roundedPercentage;
}
