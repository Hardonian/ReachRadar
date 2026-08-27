export interface TelemetryPulseTick {
  timestamp: string;
  raxIndex: number;
  youtubeBrowseVelocity: number;
  youtubeSuggestedVelocity: number;
  youtubeShortsVelocity: number;
  tiktokVolatility: number;
  reelsVolatility: number;
  activeAnomaliesCount: number;
  seismographAmplitude: number; // 0 - 100
}

/**
 * Generates high-frequency real-time telemetry pulse data for live seismograph visualizers and animated radar sweeps.
 */
export function generateLiveTelemetryTicks(count: number = 30, baseRax: number = 44.8): TelemetryPulseTick[] {
  const ticks: TelemetryPulseTick[] = [];
  const now = Date.now();

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now - i * 3000).toISOString();
    const noise = (Math.sin(i * 0.45) * 4.2) + (Math.cos(i * 0.8) * 2.1);
    const rax = Math.max(10, Math.min(95, Math.round((baseRax + noise) * 10) / 10));
    const amp = Math.max(5, Math.min(100, Math.round((rax * 1.1 + (Math.random() * 8 - 4)) * 10) / 10));

    ticks.push({
      timestamp: time,
      raxIndex: rax,
      youtubeBrowseVelocity: Math.round(58 + Math.sin(i * 0.3) * 12),
      youtubeSuggestedVelocity: Math.round(42 + Math.cos(i * 0.3) * 8),
      youtubeShortsVelocity: Math.round(31 + Math.sin(i * 0.5) * 6),
      tiktokVolatility: Math.round(35 + Math.cos(i * 0.4) * 9),
      reelsVolatility: Math.round(29 + Math.sin(i * 0.2) * 5),
      activeAnomaliesCount: rax > 50 ? 4 : 2,
      seismographAmplitude: amp,
    });
  }

  return ticks;
}
