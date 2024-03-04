export function calculatePercentage(value: number, base: number): number {
  if (base === 0) return 0;

  return Math.floor((value / base) * 100);
}
