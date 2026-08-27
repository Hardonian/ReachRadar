export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "unpaid"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

export interface BillingCustomer {
  id: string;
  organizationId: string;
  stripeCustomerId: string;
  billingEmail: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  stripeSubscriptionId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StripeEventRecord {
  id: string;
  stripeEventId: string;
  eventType: string;
  payload: Record<string, unknown>;
  processedAt: string;
  error: string | null;
}
