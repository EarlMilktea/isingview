export interface WorkerIface {
  size(): number;
  resize(size: number): void;
  update(k: number): void;
  spin(): (1 | -1)[][];
}

export function randSpin(n: number): (1 | -1)[][] {
  const baseObj = { length: n } as const;
  return Array.from(baseObj, () =>
    Array.from(baseObj, () => (Math.random() < 0.5 ? 1 : -1))
  );
}

export const SIZE_INIT = 12;
export const K_INIT = 0.44;
