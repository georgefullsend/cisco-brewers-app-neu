"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { LocationId } from "@/lib/types";
import { LocationSelector } from "./LocationSelector";

const NantucketMap = dynamic(
  () => import("./van/NantucketMap").then((mod) => mod.NantucketMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="neu-inset rounded-2xl flex items-center justify-center"
        style={{ height: 240 }}
      >
        <span className="text-text-light text-sm">Loading map...</span>
      </div>
    ),
  }
);

export function VanTab() {
  const [selectedLocation, setSelectedLocation] = useState<LocationId>("nantucket");
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
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-xl font-bold text-text-heading">Cisco Van</h1>
          <LocationSelector selected={selectedLocation} onChange={setSelectedLocation} />
        </div>
        <div className="py-12 text-center">
          <div className="text-5xl mb-4">🚐</div>
          <h2 className="font-display text-lg font-bold text-text-heading mb-2">
            Not Available Here
          </h2>
          <p className="text-text-light text-sm max-w-[260px] mx-auto leading-relaxed">
            The Cisco Van runs on Nantucket during the summer season. Switch to
            Nantucket to see the schedule!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Location selector */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-text-heading">Cisco Van</h1>
        <LocationSelector selected={selectedLocation} onChange={setSelectedLocation} />
      </div>

      {/* Map area */}
      <div className="neu-raised-lg rounded-2xl overflow-hidden">
        <div className="p-5">
          <h2 className="font-display text-text-heading text-lg font-bold mb-4">
            Van Tracker
          </h2>

          {/* Real Nantucket map with route */}
          <div className="neu-inset rounded-2xl overflow-hidden relative" style={{ height: 240, isolation: "isolate" }}>
            <NantucketMap />
            {/* Soft edge blend */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 16px 8px rgba(236, 240, 243, 0.35)" }}
            />
          </div>

          <p className="text-text-light text-[10px] text-center mt-2">
            ~2.5 miles · ~10 min drive
          </p>

          {/* Status + Next van */}
          <div className="flex items-center gap-3 mt-3">
            <span className="neu-raised-sm text-xs font-medium px-3 py-1" style={{ color: "#6B8F6B" }}>
              Running Now
            </span>
            <span className="text-text text-sm pulse-soft">
              Next from Downtown: ~{countdown} min
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
