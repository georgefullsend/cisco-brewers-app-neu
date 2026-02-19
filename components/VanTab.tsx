"use client";

import { useState, useEffect } from "react";
import type { LocationId } from "@/lib/types";

export function VanTab({
  selectedLocation,
}: {
  selectedLocation: LocationId;
}) {
  const [countdown, setCountdown] = useState(12);

  useEffect(() => {
    if (selectedLocation !== "nantucket") return;
    const interval = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 20 + Math.floor(Math.random() * 10) : c - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedLocation]);

  if (selectedLocation !== "nantucket") {
    return (
      <div className="px-4 py-16 text-center">
        <div className="text-5xl mb-4">🚐</div>
        <h2 className="font-display text-xl font-bold text-text-heading mb-2">
          The Cisco Van
        </h2>
        <p className="text-text-light text-sm max-w-[260px] mx-auto leading-relaxed">
          The Cisco Van runs on Nantucket during the summer season. Switch to the
          Nantucket location to see the schedule!
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Map area */}
      <div className="neu-raised-lg rounded-2xl overflow-hidden">
        <div className="p-5">
          <h2 className="font-display text-text-heading text-lg font-bold mb-4">
            🚐 Van Tracker
          </h2>

          {/* Stylized route map */}
          <div className="neu-inset rounded-2xl p-4">
            {/* Route visualization */}
            <div className="flex items-center justify-between mb-3">
              {/* Downtown pin */}
              <div className="text-center flex-shrink-0">
                <div className="neu-raised-sm w-8 h-8 flex items-center justify-center mx-auto mb-1" style={{ borderRadius: "999px" }}>
                  <span className="text-sm">📍</span>
                </div>
                <p className="text-text-light text-[10px] leading-tight max-w-[70px]">
                  Downtown
                </p>
              </div>

              {/* Route line with van */}
              <div className="flex-1 mx-3 relative">
                <div className="h-0.5 rounded-full" style={{ background: "#D1D9E6" }} />
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-0.5 rounded-full"
                      style={{ background: "#B8C0CC" }}
                    />
                  ))}
                </div>
                {/* Animated van */}
                <div className="absolute -top-3 left-0 van-animate">
                  <span className="text-xl">🚐</span>
                </div>
              </div>

              {/* Cisco pin */}
              <div className="text-center flex-shrink-0">
                <div className="neu-raised-sm w-8 h-8 flex items-center justify-center mx-auto mb-1" style={{ borderRadius: "999px" }}>
                  <span className="text-sm">🍺</span>
                </div>
                <p className="text-text-light text-[10px] leading-tight max-w-[70px]">
                  Cisco Brewers
                </p>
              </div>
            </div>

            <p className="text-text-light text-[10px] text-center">
              ~2.5 miles · ~10 min drive
            </p>
          </div>

          {/* Status + Next van */}
          <div className="flex items-center gap-3 mt-4">
            <span className="neu-raised-sm text-xs font-medium px-3 py-1" style={{ color: "#6B8F6B" }}>
              Running Now ✅
            </span>
            <span className="text-text text-sm pulse-soft">
              🚐 Next from Downtown: ~{countdown} min
            </span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="neu-raised rounded-2xl p-5">
        <h3 className="font-display text-text-heading font-bold mb-3">
          Summer Schedule
        </h3>
        <p className="text-text-light text-xs mb-3">
          Memorial Day – Labor Day
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-light">Monday – Saturday</span>
            <span className="text-text-heading font-medium">Noon – 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-light">Sunday</span>
            <span className="text-text-heading font-medium">Noon – 5:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-light">Frequency</span>
            <span className="text-text-heading font-medium">Every 20–30 min</span>
          </div>
        </div>
      </div>

      {/* Trip Info */}
      <div className="neu-inset rounded-2xl p-5">
        <h3 className="font-display text-text-heading font-bold mb-3 flex items-center gap-2">
          <span>🎉</span> Free Ride!
        </h3>
        <div className="space-y-2 text-sm text-text">
          <p>No reservation needed. Just show up!</p>
          <div className="pt-2 space-y-1.5">
            <p>
              <span className="font-medium text-text-heading">Pickup:</span> Corner of
              East Chestnut & Federal Streets
            </p>
            <p>
              <span className="font-medium text-text-heading">Drop-off:</span> Cisco
              Brewers, 5 Bartlett Farm Road
            </p>
            <p>
              <span className="font-medium text-text-heading">Trip time:</span> ~10
              minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
