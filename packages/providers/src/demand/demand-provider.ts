import { DemandQuery, DemandSeries, DemandSignalProvider } from "@reachradar/domain";

export class GoogleTrendsDemandProvider implements DemandSignalProvider {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey);
  }

  async getDemandSeries(query: DemandQuery): Promise<DemandSeries | null> {
    if (!this.isAvailable()) {
      return null; // Return null so analytics engine renormalizes without hallucinating demand
    }

    // In production with official API key, fetch real demand index series
    return {
      query,
      points: [],
      correlationWithCohort: undefined,
    };
  }
}
