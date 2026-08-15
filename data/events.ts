export type EventBadge = {
  label: string;
  emoji: string;
  color: "orange" | "purple";
};

export type Event = {
  id: string;
  title: string;
  type: string;
  description: string;
  host: string;
  badge: EventBadge;
  time: string;
  date: string;
  image?: string;
  spotsLeft?: number;
};

export const events: Event[] = [
  {
    id: "1",
    title: "Parttyyy",
    type: "PRIVATE PARTY",
    description: "Party",
    host: "@bhanuhu",
    badge: { label: "Dinner Event", emoji: "🍽️", color: "orange" },
    time: "2:11 PM",
    date: "02/09/26",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Party jam",
    type: "PRIVATE PARTY",
    description: "Party",
    host: "@jatinraja",
    badge: { label: "Music Jam", emoji: "🎸", color: "purple" },
    time: "9:24 PM",
    date: "03/09/26",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Chill night at",
    type: "PRIVATE PARTY",
    description: "asdfasdf",
    host: "@hkjhkljhlk",
    badge: { label: "Movie Squad", emoji: "🎬", color: "orange" },
    time: "2:38 AM",
    date: "01/09/26",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop",
  },
];