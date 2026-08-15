"use client";

import { Event } from "@/data/events";
import { ClubBadge } from "@/components/ui/ClubBadge";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  onJoin: () => void;
  isLoggedIn?: boolean;
  spotsLeft?: number;
}

export function EventCard({ event, onJoin, isLoggedIn = false, spotsLeft }: EventCardProps) {
  const badgeColors = {
    orange: "bg-orange-400 text-black",
    purple: "bg-purple-400 text-black",
  };

  return (
    <div className="bg-neutral-950 border border-white/10 rounded-md overflow-hidden">
      {/* Image */}
      {event.image && (
        <div className="relative w-full h-40 bg-neutral-900">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 500px) 100vw, 500px"
          />
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Title + club badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold">{event.title}</h3>
            <p className="text-xs text-white/50 uppercase tracking-wide mt-1">
              {event.type}
            </p>
          </div>
          <ClubBadge tier="silver" size="md" />
        </div>

        {/* Description */}
        <p className="text-sm text-white/60">{event.description}</p>

        {/* Host + Badge */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-white font-medium">{event.host}</p>
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${badgeColors[event.badge.color]}`}
          >
            <span>{event.badge.emoji}</span>
            {event.badge.label}
          </span>
        </div>

        {/* Time + Date */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-white/15 rounded-md px-4 py-3 flex items-center justify-between">
            <span className="text-white font-medium">{event.time}</span>
            <Clock className="w-5 h-5 text-white/60" />
          </div>
          <div className="border border-white/15 rounded-md px-4 py-3 flex items-center justify-between">
            <span className="text-white font-medium">{event.date}</span>
            <Calendar className="w-5 h-5 text-white/60" />
          </div>
        </div>

        {/* Confidential strip */}
        <div className="relative border border-white/15 rounded-md px-4 py-3 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 16px)",
            }}
          />
          <p className="relative text-xs text-white/50 text-center">
            Location visible only to members
          </p>
        </div>

        {/* CTA */}
        <Button onClick={onJoin} variant={isLoggedIn ? "primary" : "primary"}>
          {isLoggedIn ? "VIEW FLYER" : "JOIN"}
        </Button>

        {/* Spots left */}
        {spotsLeft !== undefined && (
          <div
            className="mt-2 py-2 text-center text-sm font-semibold rounded-lg"
            style={{
              background:
                "linear-gradient(90deg, #8b6914 0%, #d4af37 50%, #8b6914 100%)",
              color: "white",
            }}
          >
            {spotsLeft} spots left!
          </div>
        )}
      </div>
    </div>
  );
}