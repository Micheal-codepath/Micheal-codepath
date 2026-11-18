import { useState, useEffect, useCallback } from 'react';
import type { OrderSnapshot } from '@/data/tracking';

/** Milliseconds after order start when each of the 5 stages begins. */
const STAGE_TIMES = [0, 4000, 9000, 13000, 25000];
const TICK_MS = 250;

/**
 * Local delivery simulation: derives the current stage, rider progress and
 * ETA from a single interval. No backend involved.
 */
export function useOrderSimulation(timings: number[] = STAGE_TIMES) {
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const startOrder = useCallback((snapshot: OrderSnapshot) => {
    setOrder(snapshot);
    setElapsed(0);
  }, []);

  const clearOrder = useCallback(() => {
    setOrder(null);
    setElapsed(0);
  }, []);

  useEffect(() => {
    if (!order) return;
    const started = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - started;
      setElapsed(ms);
      if (ms >= timings[timings.length - 1]) clearInterval(id);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [order, timings]);

  let stageIndex = 0;
  timings.forEach((t, i) => {
    if (elapsed >= t) stageIndex = i;
  });

  const moveStart = timings[3];
  const moveEnd = timings[4];
  const progress =
    stageIndex < 3
      ? 0
      : stageIndex >= 4
        ? 1
        : Math.min(1, Math.max(0, (elapsed - moveStart) / (moveEnd - moveStart)));

  const etaMinutes =
    stageIndex === 0
      ? 30
      : stageIndex === 1
        ? 25
        : stageIndex === 2
          ? 18
          : stageIndex === 3
            ? Math.max(2, Math.round(14 * (1 - progress)))
            : 0;

  const stageTimes = timings.map((t) =>
    order && elapsed >= t ? order.placedAt + t : null,
  );

  return {
    order,
    stageIndex,
    progress,
    etaMinutes,
    stageTimes,
    startOrder,
    clearOrder,
    hasOrder: order !== null,
  };
}

export type OrderSimulation = ReturnType<typeof useOrderSimulation>;
