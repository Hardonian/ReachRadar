export type ErrorCode =
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "PLAN_LIMIT_REACHED"
  | "CHANNEL_NOT_FOUND"
  | "PROVIDER_NOT_CONFIGURED"
  | "PROVIDER_AUTH_EXPIRED"
  | "PROVIDER_RATE_LIMITED"
  | "PROVIDER_UNAVAILABLE"
  | "INSUFFICIENT_DATA"
  | "INSUFFICIENT_COHORT"
  | "BILLING_UNAVAILABLE"
  | "INVALID_REQUEST"
  | "INTERNAL_ERROR";

export class ReachRadarError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly userMessage: string;
  public readonly details?: Record<string, unknown>;

  constructor(params: {
    code: ErrorCode;
    message: string;
    statusCode?: number;
    userMessage?: string;
    details?: Record<string, unknown>;
  }) {
    super(params.message);
    this.name = "ReachRadarError";
    this.code = params.code;
    this.statusCode = params.statusCode ?? getHttpStatusForCode(params.code);
    this.userMessage = params.userMessage ?? getUserFriendlyMessage(params.code, params.message);
    this.details = params.details;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.userMessage,
        details: this.details,
      },
    };
  }
}

function getHttpStatusForCode(code: ErrorCode): number {
  switch (code) {
    case "AUTH_REQUIRED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "CHANNEL_NOT_FOUND":
      return 404;
    case "PLAN_LIMIT_REACHED":
      return 402;
    case "INVALID_REQUEST":
      return 400;
    case "PROVIDER_RATE_LIMITED":
      return 429;
    case "INSUFFICIENT_DATA":
    case "INSUFFICIENT_COHORT":
      return 422;
    case "PROVIDER_NOT_CONFIGURED":
    case "PROVIDER_AUTH_EXPIRED":
    case "PROVIDER_UNAVAILABLE":
    case "BILLING_UNAVAILABLE":
      return 503;
    case "INTERNAL_ERROR":
    default:
      return 500;
  }
}

function getUserFriendlyMessage(code: ErrorCode, defaultMsg: string): string {
  switch (code) {
    case "AUTH_REQUIRED":
      return "Please sign in to access this resource.";
    case "FORBIDDEN":
      return "You do not have permission to perform this action.";
    case "PLAN_LIMIT_REACHED":
      return "This action exceeds your current plan limits. Upgrade to continue.";
    case "CHANNEL_NOT_FOUND":
      return "The requested channel could not be found.";
    case "PROVIDER_NOT_CONFIGURED":
      return "The external integration is not configured in this environment.";
    case "PROVIDER_AUTH_EXPIRED":
      return "Your platform authorization has expired. Please reconnect your channel.";
    case "PROVIDER_RATE_LIMITED":
      return "The platform API rate limit was reached. Data synchronization will retry shortly.";
    case "PROVIDER_UNAVAILABLE":
      return "The external platform is temporarily unavailable. Historical data remains accessible.";
    case "INSUFFICIENT_DATA":
      return "Insufficient historical data available to compute this baseline.";
    case "INSUFFICIENT_COHORT":
      return "Sample size is currently below our strict privacy and statistical thresholds.";
    case "BILLING_UNAVAILABLE":
      return "Billing operations are temporarily unavailable.";
    case "INVALID_REQUEST":
      return defaultMsg || "The request was invalid or malformed.";
    case "INTERNAL_ERROR":
    default:
      return "An unexpected error occurred. Our team has been notified.";
  }
}
