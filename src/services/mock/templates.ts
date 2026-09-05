export interface MessageTemplate {
  id: string;
  name: string;
  category: "marketing" | "utility" | "authentication";
  language: string;
  status: "approved" | "pending" | "rejected" | "draft";
  preview: string;
}

export const templates: MessageTemplate[] = [
  {
    id: "t1",
    name: "order_confirmation",
    category: "utility",
    language: "en",
    status: "approved",
    preview: "Hi {{1}}, your order #{{2}} has been confirmed and will ship soon.",
  },
  {
    id: "t2",
    name: "seasonal_offer",
    category: "marketing",
    language: "en",
    status: "pending",
    preview: "{{1}}, don't miss our seasonal offer — up to 30% off this week only.",
  },
  {
    id: "t3",
    name: "otp_verification",
    category: "authentication",
    language: "en",
    status: "draft",
    preview: "Your verification code is {{1}}. It expires in 10 minutes.",
  },
];
