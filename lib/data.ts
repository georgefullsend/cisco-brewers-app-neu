import type {
  CiscoLocation,
  Beer,
  Spirit,
  CiscoEvent,
  GearProduct,
  ActivityItem,
  UserProfile,
} from "./types";

export const user: UserProfile = {
  firstName: "Jake",
  memberSince: "June 2024",
  stampsCollected: 7,
  totalStamps: 10,
  lifetimeBeers: 42,
  locationsVisited: 4,
  eventsAttended: 7,
};

export const locations: CiscoLocation[] = [
  {
    id: "nantucket",
    name: "Nantucket",
    address: "5 Bartlett Farm Road, Nantucket, MA",
    hours: "Mon–Sat 11am–7pm, Sun 12–6pm",
  },
  {
    id: "seaport",
    name: "Seaport",
    address: "85 Northern Ave, Boston, MA",
    hours: "Mon–Thu 11am–10pm, Fri–Sat 11am–11pm, Sun 11am–9pm",
  },
  {
    id: "new-bedford",
    name: "New Bedford",
    address: "1482 E Rodney French Blvd, New Bedford, MA",
    hours: "Wed–Sun 12–8pm",
  },
  {
    id: "fenway",
    name: "Fenway",
    address: "1301 Boylston St, Boston, MA",
    hours: "Mon–Sun 11am–11pm (game days extended)",
  },
];

export const beers: Beer[] = [
  {
    name: "Whale's Tale Pale Ale",
    style: "English Pale Ale",
    abv: 5.5,
    description:
      "Named for Nantucket's whaling history. Balanced and timeless.",
    image: "/images/beers/whales-tale.jpg",
  },
  {
    name: "Grey Lady",
    style: "Wheat Ale",
    abv: 4.0,
    description: "Foggy island vibes. Belgian yeast, fruit, and spice.",
    image: "/images/beers/grey-lady.jpg",
  },
  {
    name: "Gripah",
    style: "Grapefruit IPA",
    abv: 5.5,
    description: 'Zesty citrus meets tropical hops. Always ends in "ahhh."',
    image: "/images/beers/gripah.jpg",
  },
  {
    name: "Shark Tracker Lager",
    style: "Lager",
    abv: 4.7,
    description:
      "Light, crisp, and supports shark research with OCEARCH.",
    image: "/images/beers/shark-tracker.jpg",
  },
  {
    name: "Wandering Haze",
    style: "New England IPA",
    abv: 6.8,
    description:
      "Juicy, citrusy, thick with tropical fruit and lime zest.",
    image: "/images/beers/wandering-haze.jpg",
  },
  {
    name: "Summer Rays",
    style: "Golden Ale",
    abv: 4.4,
    description:
      "Brewed for golden days. Hoppy, tropical, best enjoyed barefoot.",
    image: "/images/beers/summer-rays.png",
  },
  {
    name: "Indie IPA",
    style: "IPA",
    abv: 6.5,
    description:
      "Rips through cold weather. Pine and citrus charge the senses.",
    image: "/images/beers/indie-ipa.jpg",
  },
  {
    name: "Sankaty Light",
    style: "Light Lager",
    abv: 3.8,
    description: "The lightest, most refreshing of the fleet.",
    image: "/images/beers/sankaty-light.jpg",
  },
];

export const spirits: Spirit[] = [
  {
    name: "Triple Eight Vodka",
    type: "Vodka",
    description:
      "Distilled from organic corn, filtered through Nantucket sand.",
    image: "/images/spirits/triple-eight-vodka.png",
  },
  {
    name: "Blueberry Vodka",
    type: "Flavored Vodka",
    description: "Wild blueberry infusion. Summer in a glass.",
    image: "/images/spirits/blueberry-vodka.png",
  },
  {
    name: "Notch Whiskey",
    type: "Single Malt Whiskey",
    description:
      "Aged in new American oak. The five-year dream that started it all.",
    image: "/images/spirits/notch-whiskey.png",
  },
];

export const events: CiscoEvent[] = [
  // Nantucket
  {
    id: "e1",
    date: "2026-02-20",
    name: "Thursday Trivia",
    time: "6:00 PM",
    type: "Trivia",
    location: "nantucket",
    description: "Test your knowledge and win prizes. Teams of up to 6.",
  },
  {
    id: "e2",
    date: "2026-02-22",
    name: "Live Music: Buckley & The Barkeeps",
    time: "2:00 PM",
    type: "Live Music",
    location: "nantucket",
    description:
      "Acoustic folk-rock on the patio. Grab a pint and settle in.",
  },
  {
    id: "e3",
    date: "2026-02-28",
    name: "Tasting Tour",
    time: "1:00 PM & 3:00 PM",
    type: "Tasting",
    location: "nantucket",
    description:
      "Guided tour of the brewery, distillery, and vineyard with tastings.",
  },
  {
    id: "e4",
    date: "2026-03-01",
    name: "Live Music: Island Vibes Duo",
    time: "2:00 PM",
    type: "Live Music",
    location: "nantucket",
    description: "Reggae-meets-surf acoustic set. Good vibes only.",
  },
  {
    id: "e5",
    date: "2026-03-07",
    name: "Shark Tracker Launch Party",
    time: "5:00 PM",
    type: "Special",
    location: "nantucket",
    description:
      "Celebrating the new season of OCEARCH shark tracking. Shark Tracker Lager on draft.",
  },
  {
    id: "e6",
    date: "2026-03-08",
    name: "Tasting Tour",
    time: "1:00 PM & 3:00 PM",
    type: "Tasting",
    location: "nantucket",
    description:
      "Guided tour of the brewery, distillery, and vineyard with tastings.",
  },
  // Seaport
  {
    id: "e7",
    date: "2026-02-21",
    name: "Live Music: Harbor Sound",
    time: "5:00 PM",
    type: "Live Music",
    location: "seaport",
    description: "Boston's own Harbor Sound brings waterfront vibes.",
  },
  {
    id: "e8",
    date: "2026-02-22",
    name: "Brunch & Brews",
    time: "11:00 AM",
    type: "Food",
    location: "seaport",
    description: "Weekend brunch pairings with Cisco beers. Reservations recommended.",
  },
  {
    id: "e9",
    date: "2026-03-01",
    name: "First Pitch Party (Red Sox Kickoff)",
    time: "4:00 PM",
    type: "Special",
    location: "seaport",
    description:
      "Kick off the baseball season Cisco-style. Specials on Shark Tracker Lager all night.",
  },
  // New Bedford
  {
    id: "e10",
    date: "2026-02-22",
    name: "Open Mic Night",
    time: "7:00 PM",
    type: "Live Music",
    location: "new-bedford",
    description: "Bring your guitar, your voice, or just your ears.",
  },
  {
    id: "e11",
    date: "2026-03-08",
    name: "St. Paddy's Pre-Game",
    time: "3:00 PM",
    type: "Festival",
    location: "new-bedford",
    description: "Green beer, live music, and shenanigans.",
  },
  // Fenway
  {
    id: "e12",
    date: "2026-03-15",
    name: "Defend the Fort Tailgate (NE Revolution)",
    time: "12:00 PM",
    type: "Special",
    location: "fenway",
    description: "Pre-match party with drink specials and giveaways.",
  },
  {
    id: "e13",
    date: "2026-04-01",
    name: "Opening Day Party",
    time: "11:00 AM",
    type: "Festival",
    location: "fenway",
    description:
      "The biggest party of the year. Live music, food trucks, and cold beer.",
  },
];

export const gearProducts: GearProduct[] = [
  { id: "g1", name: "Cisco Logo Trucker Hat", price: 32, category: "Hats", image: "/images/gear/trucker-hat.jpg" },
  { id: "g2", name: "Whale's Tale Tee", price: 28, category: "Shirts", image: "/images/gear/whales-tale-tee.jpg" },
  { id: "g3", name: "Nantucket Hoodie", price: 65, category: "Outerwear", image: "/images/gear/hoodie.jpg" },
  { id: "g4", name: "Stone Coaster Variety 4-Pack", price: 24, category: "Drinkware", image: "/images/gear/pint-coasters.png" },
  { id: "g5", name: "Yeti Wine Tumbler", price: 45, category: "Drinkware", image: "/images/gear/yeti-tumbler.jpg" },
  { id: "g6", name: "Cisco Flask", price: 38, category: "Drinkware", image: "/images/gear/flask.jpg" },
];

export const activityFeed: ActivityItem[] = [
  {
    icon: "🍺",
    text: "Whale's Tale Pale Ale — Nantucket Taproom",
    time: "2 days ago",
  },
  {
    icon: "🎵",
    text: "Attended: Live Music Friday — Seaport",
    time: "1 week ago",
  },
  {
    icon: "🍺",
    text: "Gripah IPA — Nantucket Taproom",
    time: "1 week ago",
  },
  {
    icon: "🛍️",
    text: "Earned: Early Access to Summer Drop",
    time: "2 weeks ago",
  },
];

export const beerEmojis: Record<string, string> = {
  "Whale's Tale Pale Ale": "🐋",
  "Grey Lady": "🌫️",
  "Gripah": "🍊",
  "Shark Tracker Lager": "🦈",
  "Wandering Haze": "🌅",
  "Summer Rays": "☀️",
  "Indie IPA": "🌲",
  "Sankaty Light": "⛵",
};

export const spiritEmojis: Record<string, string> = {
  "Triple Eight Vodka": "🥃",
  "Blueberry Vodka": "🫐",
  "Notch Whiskey": "🥃",
};
