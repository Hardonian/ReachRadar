# ReachRadar — Statistical Methodology & Detection Standards

## 1. Baseline Estimation
For every time series (Views, Impressions, CTR, AVD):
- **Window:** 28 days historical observations (minimum 14 days required).
- **Central Tendency:** Median ($\tilde{x}$) instead of arithmetic mean.
- **Scale Estimator:** Median Absolute Deviation ($\text{MAD} = \text{median}(|x_i - \tilde{x}|)$) with standard scaling factor $1.4826$.
- **Day-of-Week Seasonality:** Decomposed per weekday ($DOW \in [0, 6]$) using weekday median multipliers.

## 2. Robust Z-Score
$$\text{Robust } Z = \frac{0.6745 \cdot (x_t - \text{Expected}_t)}{\max(\text{MAD}_t, 10^{-5})}$$
An anomaly is triggered when $|Z| \ge 2.0$.

## 3. Ensemble Detection Scoring Matrix (v1.0.0)
| Signal Component | Weight | Mathematical Formulation |
| :--- | :--- | :--- |
| **Effect Magnitude** | 20% | Bounded absolute percentage delta of cohort median |
| **Cohort Consensus** | 20% | Proportion of member channels deviating in consensus direction |
| **Persistence** | 15% | CUSUM control chart threshold + EWMA momentum + run survival |
| **Cross-Metric Coherence** | 10% | Stability of CTR ($\pm 5\%$) & Retention ($\pm 5\%$) during reach shifts |
| **Surface Concentration** | 10% | Dominance of variance in Browse, Suggested, Search, or Shorts |
| **Owner Diversity** | 10% | $1.0 - \text{HHI}$ (Herfindahl-Hirschman concentration index) |
| **Sample Quality** | 10% | Channel count / 25 + Baseline completeness / 28d |
| **Demand Independence** | 5% | Inverse correlation with external category Google search index |

## 4. Confidence Classification
- **0–39:** LOW SIGNAL
- **40–59:** WATCH
- **60–79:** LIKELY SHIFT
- **80–100:** STRONG SIGNAL

## 5. Hard Eligibility & Suppression Gates
- If $\text{Channels} < 25$ or $\text{Distinct Owners} < 10$: Public publication is **SUPPRESSED** and score is capped at $\le 45$.
- If $\text{HHI} > 0.35$: Public publication is **SUPPRESSED** and score is capped at $\le 55$.
