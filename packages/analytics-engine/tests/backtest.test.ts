import { describe, it, expect } from "vitest";
import { BacktestHarness } from "../src/backtest/backtest-harness";

describe("Backtest Benchmark Harness", () => {
  it("evaluates precision, recall, and detection latency across 10 benchmark scenarios", async () => {
    const harness = new BacktestHarness();
    const benchmark = await harness.runBenchmark();

    expect(benchmark.totalScenarios).toBe(10);
    expect(benchmark.precision).toBeGreaterThanOrEqual(0.8);
    expect(benchmark.recall).toBeGreaterThanOrEqual(0.8);
    expect(benchmark.falsePositives).toBeLessThanOrEqual(2);
  });
});
