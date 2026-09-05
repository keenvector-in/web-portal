export interface Conversation {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status: "open" | "closed" | "pending";
}

export interface Message {
  id: string;
  from: "customer" | "agent";
  text: string;
  timestamp: string;
}

export const conversations: Conversation[] = [
  {
    id: "c1",
    customerName: "Priya Sharma",
    lastMessage: "Is the order shipped yet?",
    timestamp: "09:41",
    unread: true,
    status: "open",
  },
  {
    id: "c2",
    customerName: "Arjun Mehta",
    lastMessage: "Thanks, that resolved it!",
    timestamp: "Yesterday",
    unread: false,
    status: "closed",
  },
  {
    id: "c3",
    customerName: "Fatima Khan",
    lastMessage: "Can I get a refund for this?",
    timestamp: "Yesterday",
    unread: true,
    status: "pending",
  },
];

export const messagesByConversation: Record<string, Message[]> = {
  c1: [
    { id: "m1", from: "customer", text: "Hi, I placed an order yesterday.", timestamp: "09:38" },
    { id: "m2", from: "customer", text: "Is the order shipped yet?", timestamp: "09:41" },
  ],
  c2: [
    { id: "m3", from: "customer", text: "My last message wasn't delivered.", timestamp: "Yesterday" },
    { id: "m4", from: "agent", text: "Try resending now, it should go through.", timestamp: "Yesterday" },
    { id: "m5", from: "customer", text: "Thanks, that resolved it!", timestamp: "Yesterday" },
  ],
  c3: [{ id: "m6", from: "customer", text: "Can I get a refund for this?", timestamp: "Yesterday" }],
};
