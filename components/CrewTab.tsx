"use client";

import { user, activityFeed } from "@/lib/data";
import { PunchCard } from "./PunchCard";
import { CiscoLogo } from "./CiscoLogo";

export function CrewTab() {
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-heading">
            Ahoy, {user.firstName} 👋
          </h1>
          <p className="text-text-light text-sm mt-0.5">
            Crew Member since {user.memberSince}
          </p>
        </div>
        {/* Profile avatar */}
        <button className="w-10 h-10 rounded-full neu-raised-sm flex items-center justify-center text-text-light" style={{ borderRadius: "999px" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-4 3-7 7-7s7 3 7 7" />
          </svg>
        </button>
      </div>

      {/* Punch Card */}
      <PunchCard />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: user.lifetimeBeers, label: "Lifetime Beers" },
          { value: user.locationsVisited, label: "Locations" },
          { value: user.eventsAttended, label: "Events" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="neu-raised rounded-2xl p-3 text-center"
          >
            <div className="font-display text-2xl font-bold text-text-heading">
              {stat.value}
            </div>
            <div className="text-text-light text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-display text-lg font-bold text-text-heading mb-3">
          Recent Activity
        </h2>
        <div className="space-y-2">
          {activityFeed.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 neu-raised rounded-2xl px-4 py-3"
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text leading-snug">{item.text}</p>
                <p className="text-xs text-text-light mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Teaser */}
      <div className="neu-inset rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-brand"><CiscoLogo size={20} /></span>
          <h3 className="font-display text-text-heading font-bold">Next Reward</h3>
        </div>
        <p className="text-text text-sm mb-3">
          Free pint — {user.totalStamps - user.stampsCollected} stamps away
        </p>
        <div className="pt-3" style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.04)" }}>
          <p className="text-brand text-xs font-medium mb-1.5">
            Crew Perks
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {[
              "Early merch access",
              "Birthday beer",
              "Event priority",
            ].map((perk) => (
              <span
                key={perk}
                className="text-text-light text-xs flex items-center gap-1"
              >
                <span className="text-brand">·</span> {perk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Brand tagline */}
      <p className="text-center text-text-light text-xs italic tracking-wide">
        "Hard to get to, but even harder to leave."
      </p>
    </div>
  );
}
