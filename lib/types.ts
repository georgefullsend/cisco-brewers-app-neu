export type LocationId = "nantucket" | "seaport" | "new-bedford" | "fenway";
export type TabId = "crew" | "events" | "van" | "gear" | "discover";

export interface CiscoLocation {
  id: LocationId;
  name: string;
  address: string;
  hours: string;
}

export interface Beer {
  name: string;
  style: string;
  abv: number;
  description: string;
  image?: string;
}

export interface Spirit {
  name: string;
  type: string;
  description: string;
  image?: string;
}

export interface CiscoEvent {
  id: string;
  date: string; // YYYY-MM-DD
  name: string;
  time: string;
  type: "Live Music" | "Trivia" | "Tasting" | "Festival" | "Special" | "Food";
  location: LocationId;
  description?: string;
}

export interface GearProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface ActivityItem {
  icon: string;
  text: string;
  time: string;
}

export interface UserProfile {
  firstName: string;
  memberSince: string;
  stampsCollected: number;
  totalStamps: number;
  lifetimeBeers: number;
  locationsVisited: number;
  eventsAttended: number;
}
