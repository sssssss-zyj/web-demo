export interface RoastRequest {
  sin: string;
}

export interface RoastResponse {
  score: number;
  hexagram: string;
  element_imbalance: string;
  roast: string;
  next_life: string;
}

export interface DestinyRequest {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: string;
}

export interface DestinyResponse {
  overview: string;
  wealth: string;
  love: string;
  cure: string;
}

export type AppStage = 'input' | 'loading' | 'roast' | 'paywall' | 'baziform' | 'destiny-loading' | 'destiny';