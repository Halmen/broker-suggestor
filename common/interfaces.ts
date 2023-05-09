export interface Broker {
  id: number;
  name: string;
  logoUrl: string;
  linkUrl: string;
  score: number;
  isForex?: boolean;
  isStock?: boolean;
}

export type eventType = "impression" | "click";
export type listType = "topStock" | "search" | "topForex";
