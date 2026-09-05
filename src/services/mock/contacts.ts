export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: "active" | "unsubscribed";
  lastInteraction: string;
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Priya Sharma",
    phone: "+91 98200 11122",
    email: "priya@example.com",
    source: "WhatsApp",
    status: "active",
    lastInteraction: "2 hours ago",
  },
  {
    id: "2",
    name: "Arjun Mehta",
    phone: "+91 98100 33445",
    email: "arjun@example.com",
    source: "Website",
    status: "active",
    lastInteraction: "Yesterday",
  },
  {
    id: "3",
    name: "Fatima Khan",
    phone: "+91 99870 55667",
    email: "fatima@example.com",
    source: "Import",
    status: "unsubscribed",
    lastInteraction: "3 days ago",
  },
];
