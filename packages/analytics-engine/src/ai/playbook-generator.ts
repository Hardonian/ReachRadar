import { RecommendationAction } from "@reachradar/domain";

export interface PlaybookStep {
  dayRange: string; // e.g. "Day 1 - 3"
  phase: "TRIAGE" | "STABILIZATION" | "RE-INDEXING" | "MOMENTUM";
  title: string;
  checklist: string[];
  prohibitedActions: string[];
}

export interface TacticalPlaybook {
  channelId: string;
  actionType: RecommendationAction;
  title: string;
  executiveSummary: string;
  estimatedRecoveryDays: number;
  steps: PlaybookStep[];
  generatedAt: string;
}

/**
 * Generates an actionable, structured 14-day tactical remediation roadmap based on shift classification.
 */
export function generateTacticalPlaybook(
  channelId: string,
  action: RecommendationAction,
  channelTitle: string = "Channel"
): TacticalPlaybook {
  if (action === "HOLD_STRATEGY") {
    return {
      channelId,
      actionType: action,
      title: `14-Day Algorithm Volatility Hold & Resilience Playbook for ${channelTitle}`,
      executiveSummary: "Your channel decline is driven by systemic platform distribution contraction across your niche rather than content quality decay. The optimal response is holding strategic cadence while protecting core subscriber affinity.",
      estimatedRecoveryDays: 12,
      steps: [
        {
          dayRange: "Days 1 – 3",
          phase: "TRIAGE",
          title: "Containment & Negative Control Audit",
          checklist: [
            "Verify search & direct notification CTR remains within normal baseline.",
            "Do NOT unlist, private, or re-upload videos published during the volatility window.",
            "Do NOT alter thumbnails of videos older than 7 days.",
          ],
          prohibitedActions: [
            "Pivoting content niche abruptly.",
            "Deleting or making videos private.",
            "Flooding uploads with low-effort shorts.",
          ],
        },
        {
          dayRange: "Days 4 – 7",
          phase: "STABILIZATION",
          title: "High-Affinity Core Upload Cadence",
          checklist: [
            "Publish your planned core format with an emphasis on high-confidence authority keywords in the first 40 characters.",
            "Pin an engaging discussion question in the comments within 15 minutes of publish to stimulate session depth.",
            "Monitor 24h cohort weather index on ReachRadar.",
          ],
          prohibitedActions: [
            "Drastic change in video duration (+/- 50%).",
            "Clickbait sensationalism that degrades retention percentage.",
          ],
        },
        {
          dayRange: "Days 8 – 14",
          phase: "RE-INDEXING",
          title: "Gradual Cold Impression Re-expansion",
          checklist: [
            "A/B test title variants emphasizing curiosity only after initial 48h search indexation is locked.",
            "Cross-link back-catalogue high-performers via End Screens and Community Posts.",
            "Review post-shift baseline stabilization report.",
          ],
          prohibitedActions: ["Premature panic discounting of sponsor placements."],
        },
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  if (action === "REVIEW_PACKAGING") {
    return {
      channelId,
      actionType: action,
      title: `14-Day Packaging & CTR Overhaul Playbook for ${channelTitle}`,
      executiveSummary: "Cohort analytics indicate your reach decline is isolated to your channel due to softening thumbnail contrast and title CTR. This playbook executes a methodical packaging renewal.",
      estimatedRecoveryDays: 7,
      steps: [
        {
          dayRange: "Days 1 – 2",
          phase: "TRIAGE",
          title: "Thumbnail Contrast & Subject Isolation Audit",
          checklist: [
            "Test current thumbnails at 120px mobile scale in greyscale to verify visual contrast.",
            "Reduce text on thumbnail to max 2–3 high-contrast words.",
            "Re-render thumbnails for the last 3 underperforming videos with elevated foreground brightness (+15%).",
          ],
          prohibitedActions: ["Changing titles and thumbnails simultaneously (isolate variables)."],
        },
        {
          dayRange: "Days 3 – 7",
          phase: "STABILIZATION",
          title: "Title Benefit & Curiosity A/B Testing",
          checklist: [
            "Front-load the core subject and consequence in the first 35 characters of the next upload.",
            "Run Title A/B test comparing Direct Statement vs Curiosity Question.",
          ],
          prohibitedActions: ["Overpromising in title beyond what the first 30 seconds delivers."],
        },
        {
          dayRange: "Days 8 – 14",
          phase: "MOMENTUM",
          title: "Packaging Template Systematization",
          checklist: [
            "Lock winning thumbnail layout grid as standardized template for next 4 uploads.",
            "Measure 7-day CTR lift in ReachRadar Portfolio view.",
          ],
          prohibitedActions: ["Reverting to low-contrast aesthetic templates."],
        },
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  return {
    channelId,
    actionType: action,
    title: `14-Day Distribution Maximization Playbook for ${channelTitle}`,
    executiveSummary: "Your content is outperforming cohort distribution baselines. Execute this playbook to maximize algorithmic momentum and expand audience capture.",
    estimatedRecoveryDays: 14,
    steps: [
      {
        dayRange: "Days 1 – 5",
        phase: "MOMENTUM",
        title: "Format Sequencing & Thematic Follow-up",
        checklist: [
          "Fast-track a direct thematic sequel to your top-performing recent upload.",
          "Place top video as first recommendation on End Screens and Community Posts.",
        ],
        prohibitedActions: ["Slowing down upload cadence during algorithm tailwinds."],
      },
      {
        dayRange: "Days 6 – 14",
        phase: "RE-INDEXING",
        title: "Shorts & Community Cross-Pollination",
        checklist: [
          "Cut 3 high-impact vertical shorts from the hero video with pinned comment links to full long-form.",
          "Capture new subscriber cohorts into email list or community hub.",
        ],
        prohibitedActions: ["Diverting to unproven experimental topics."],
      },
    ],
    generatedAt: new Date().toISOString(),
  };
}
