// 1 JOD = 1000 fils. All amounts in the app are integers in fils.

export function toFils(dinars: number): number {
  return Math.round(dinars * 1000);
}

export function formatJOD(fils: number): string {
  return (fils / 1000).toFixed(3) + ' JOD';
}

// Split a total into n parts that always add up to the total exactly.
// Example: 10000 / 3 -> [3334, 3333, 3333]
export function splitEqually(total: number, n: number): number[] {
  if (!Number.isInteger(total) || total <= 0) throw new Error('total must be a positive integer');
  if (!Number.isInteger(n) || n <= 0) throw new Error('n must be a positive integer');

  const base = Math.floor(total / n);
  const remainder = total % n;
  return Array.from({ length: n }, (_, i) => (i < remainder ? base + 1 : base));
}