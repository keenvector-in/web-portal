import { AtSign, Mail, MessageCircle, type LucideIcon } from "lucide-react";

export type Channel = "whatsapp" | "email" | "instagram";

export const CHANNEL_META: Record<Channel, { label: string; icon: LucideIcon; className: string }> = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle, className: "text-accent-400" },
  email: { label: "Email", icon: Mail, className: "text-amber-400" },
  instagram: { label: "Instagram", icon: AtSign, className: "text-pink-400" },
};

export const marketingChannels: Channel[] = ["whatsapp", "email", "instagram"];
