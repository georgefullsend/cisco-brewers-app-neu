"use client";

import { useState } from "react";
import { user } from "@/lib/data";
import { CiscoLogo } from "./CiscoLogo";

function StampIcon({ filled }: { filled: boolean }) {
  return (
    <div
      className={`stamp w-full aspect-square flex items-center justify-center ${
        filled ? "stamp-filled neu-raised-sm text-text-heading" : "stamp-empty neu-inset-sm text-base-darker"
      }`}
    >
      <CiscoLogo size={filled ? 28 : 24} />
    </div>
  );
}

export function PunchCard({ stampsCollected: stampsProp }: { stampsCollected?: number }) {
  const stampsCollected = stampsProp ?? user.stampsCollected;
  const [tappedStamp, setTappedStamp] = useState<number | null>(null);

  const stampDates = [
    { date: "Jan 5", location: "Nantucket" },
    { date: "Jan 12", location: "Seaport" },
    { date: "Jan 19", location: "Nantucket" },
    { date: "Jan 28", location: "Fenway" },
    { date: "Feb 2", location: "Nantucket" },
    { date: "Feb 8", location: "New Bedford" },
    { date: "Feb 15", location: "Nantucket" },
  ];

  return (
    <div className="neu-inset rounded-2xl p-5">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-text-heading text-lg font-bold">
            Loyalty Card
          </h3>
          <p className="text-text-light text-xs mt-0.5">
            {stampsCollected} of {user.totalStamps} stamps
          </p>
        </div>
        <div className="text-text-light text-xs font-mono">
          #4821
        </div>
      </div>

      {/* Stamp grid */}
      <div className="grid grid-cols-5 gap-2.5 mb-4">
        {Array.from({ length: user.totalStamps }).map((_, i) => {
          const filled = i < stampsCollected;
          return (
            <div key={i} className="relative">
              <button
                onClick={() => {
                  if (filled) setTappedStamp(tappedStamp === i ? null : i);
                }}
                className="w-full"
                aria-label={
                  filled
                    ? `Stamp ${i + 1}: earned ${stampDates[i]?.date}`
                    : `Stamp ${i + 1}: not yet earned`
                }
              >
                <StampIcon filled={filled} />
              </button>
              {/* Tooltip */}
              {tappedStamp === i && filled && stampDates[i] && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 neu-raised-sm text-text text-[10px] font-medium px-2 py-1 whitespace-nowrap z-20">
                  {stampDates[i].date} · {stampDates[i].location}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress text */}
      <p className="text-center text-text text-sm">
        {user.totalStamps - stampsCollected} more pints to your next free
        beer 🍺
      </p>
    </div>
  );
}
