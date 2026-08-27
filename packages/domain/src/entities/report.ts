export type ReportType =
  | "weekly_creator_intelligence"
  | "agency_portfolio_report"
  | "shift_incident_report";

export type ReportFormat = "web" | "csv" | "print_html" | "pdf_ready";

export interface ReportRun {
  id: string;
  organizationId: string;
  channelId: string | null;
  reportType: ReportType;
  title: string;
  startDate: string;
  endDate: string;
  summaryText: string;
  structuredPayload: Record<string, unknown>;
  format: ReportFormat;
  createdAt: string;
}
