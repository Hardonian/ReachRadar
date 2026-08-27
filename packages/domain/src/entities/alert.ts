export type AlertChannel = "in_app" | "email" | "webhook";

export type AlertConditionType =
  | "platform_weather_elevated"
  | "niche_shift_detected"
  | "channel_likely_affected"
  | "surface_movement_exceeds"
  | "shift_status_changed";

export interface AlertRule {
  id: string;
  organizationId: string;
  channelId: string | null;
  name: string;
  conditionType: AlertConditionType;
  thresholdValue: number | null;
  surfaceFilter: string | null;
  channels: AlertChannel[];
  emailRecipients: string[];
  webhookUrl: string | null;
  cooldownHours: number;
  lastTriggeredAt: string | null;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AlertDelivery {
  id: string;
  alertRuleId: string;
  organizationId: string;
  channelId: string | null;
  shiftId: string | null;
  title: string;
  message: string;
  severity: "info" | "warning" | "critical";
  channel: AlertChannel;
  deliveryStatus: "delivered" | "failed" | "suppressed_cooldown";
  deliveredAt: string;
  readAt: string | null;
}
