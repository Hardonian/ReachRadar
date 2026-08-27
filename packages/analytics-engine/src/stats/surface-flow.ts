import { SurfaceFlowVector } from "@reachradar/domain";

export interface SurfaceDeltasInput {
  browseDeltaPct: number;
  suggestedDeltaPct: number;
  searchDeltaPct: number;
  shortsDeltaPct: number;
  notificationsDeltaPct: number;
  externalDeltaPct?: number;
}

export interface SurfaceFlowAnalysisResult {
  dominantSurfaceMovement: string;
  surfaceConcentrationScore: number; // 0 - 100
  regimeType: "contraction" | "expansion" | "diversification" | "polarization";
  flowVectors: SurfaceFlowVector[];
  explanation: string;
}

/**
 * Calculates multi-surface flow redistribution vectors and identifies recommendation algorithmic regimes.
 */
export function analyzeSurfaceFlow(
  surfaceDeltas: SurfaceDeltasInput
): SurfaceFlowAnalysisResult {
  const surfaces: Array<{ name: string; delta: number }> = [
    { name: "Browse", delta: surfaceDeltas.browseDeltaPct },
    { name: "Suggested", delta: surfaceDeltas.suggestedDeltaPct },
    { name: "Search", delta: surfaceDeltas.searchDeltaPct },
    { name: "Shorts", delta: surfaceDeltas.shortsDeltaPct },
    { name: "Notifications", delta: surfaceDeltas.notificationsDeltaPct },
  ];

  if (surfaceDeltas.externalDeltaPct !== undefined) {
    surfaces.push({ name: "External", delta: surfaceDeltas.externalDeltaPct });
  }

  // Sort by absolute delta
  surfaces.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const dominant = surfaces[0];

  // Calculate flow concentration (HHI of absolute delta shares)
  const totalAbsDelta = surfaces.reduce((acc, s) => acc + Math.abs(s.delta), 0);
  const shares = surfaces.map((s) => (totalAbsDelta > 0 ? Math.abs(s.delta) / totalAbsDelta : 0));
  const hhi = shares.reduce((acc, sh) => acc + Math.pow(sh, 2), 0);
  const surfaceConcentrationScore = Math.min(100, Math.round(hhi * 100));

  // Determine algorithmic regime type
  let regimeType: SurfaceFlowAnalysisResult["regimeType"] = "contraction";
  const negativeSurfaces = surfaces.filter((s) => s.delta < -5);
  const positiveSurfaces = surfaces.filter((s) => s.delta > 5);

  if (negativeSurfaces.length >= 3 && positiveSurfaces.length === 0) {
    regimeType = "contraction";
  } else if (positiveSurfaces.length >= 3 && negativeSurfaces.length === 0) {
    regimeType = "expansion";
  } else if (positiveSurfaces.length >= 1 && negativeSurfaces.length >= 1) {
    regimeType = "polarization";
  } else {
    regimeType = "diversification";
  }

  // Generate directional flow vectors
  const flowVectors: SurfaceFlowVector[] = [];
  for (let i = 0; i < surfaces.length - 1; i++) {
    const s1 = surfaces[i];
    const s2 = surfaces[i + 1];
    if (Math.abs(s1.delta) > 5) {
      flowVectors.push({
        sourceSurface: s1.delta < 0 ? s1.name : "Platform Baseline",
        targetSurface: s1.delta >= 0 ? s1.name : s2.name,
        flowVolumeDeltaPct: Math.round(s1.delta * 10) / 10,
        redistributionShare: Math.round(shares[i] * 100),
        regimeType,
      });
    }
  }

  let explanation = "";
  if (regimeType === "polarization") {
    explanation = `Distribution redirected from ${negativeSurfaces.map((s) => s.name).join(", ")} into ${positiveSurfaces.map((s) => s.name).join(", ")}.`;
  } else if (regimeType === "contraction") {
    explanation = `Broad contraction concentrated in ${dominant.name} (${dominant.delta > 0 ? "+" : ""}${dominant.delta.toFixed(1)}%).`;
  } else if (regimeType === "expansion") {
    explanation = `Recommendation surface expansion led by ${dominant.name} (${dominant.delta > 0 ? "+" : ""}${dominant.delta.toFixed(1)}%).`;
  } else {
    explanation = `Moderate surface diversification with ${dominant.name} exhibiting primary variance.`;
  }

  return {
    dominantSurfaceMovement: dominant.name,
    surfaceConcentrationScore,
    regimeType,
    flowVectors,
    explanation,
  };
}
