"use client";

import { useState, useRef, useEffect } from "react";
import type { TabId, LocationId } from "@/lib/types";
import { locations } from "@/lib/data";
import { CiscoLogo } from "./CiscoLogo";
import { CrewTab } from "./CrewTab";
import { EventsTab } from "./EventsTab";
import { VanTab } from "./VanTab";
import { GearTab } from "./GearTab";
import { DiscoverTab } from "./DiscoverTab";

const tabs: { id: TabId; label: string }[] = [
  { id: "crew", label: "The Crew" },
  { id: "events", label: "Events" },
  { id: "van", label: "Cisco Van" },
  { id: "gear", label: "Gear" },
  { id: "discover", label: "Discover" },
];

function TabIcon({ id, active }: { id: TabId; active: boolean }) {
  const color = "currentColor";
  const strokeWidth = active ? 2.2 : 1.8;

  switch (id) {
    case "crew":
      // Whale tail (by Delapouite, CC BY 3.0)
      return (
        <svg width="24" height="24" viewBox="0 0 512 512" fill={color}>
          <path d="M453.004 35.117c-65.314 46.61-189.755 41.018-213.559 125.426C184.41 101.41 98.625 83.031 21.771 63.209c6.532 139.103 71.38 147.437 192.44 194.547 23.71 25.786 29.786 49.93 19.254 82.705 46.403 5.1 71.504 15.468 106.754 27.742-.708-71.67-25.14-108.928-75.518-175.035 11.058 4.233 44.979 37.02 56.578 58.607 109.419-42.421 147.64-112.074 131.725-216.658zM180.178 353.9c-60.89-.24-114.034 19.49-158.426 74.221 167.075-48.84 292.003-13.21 471.893 7.895-118.936-38.752-224.474-81.763-313.467-82.116zm98.043 77.844c-99.28.255-206.34 18.738-256.866 63.139 168.002-26.61 356.801-28.408 470.8-4.967 1.102-35.337-101.418-58.46-213.934-58.172z" />
        </svg>
      );
    case "events":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <circle cx="12" cy="15" r="1.5" fill={active ? color : "none"} />
        </svg>
      );
    case "van":
      // Shuttle van (Font Awesome, CC BY 4.0)
      return (
        <svg width="26" height="24" viewBox="0 -64 640 640" fill={color}>
          <path d="M628.88 210.65L494.39 49.27A48.01 48.01 0 0 0 457.52 32H32C14.33 32 0 46.33 0 64v288c0 17.67 14.33 32 32 32h32c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h32c17.67 0 32-14.33 32-32V241.38c0-11.23-3.94-22.1-11.12-30.73zM64 192V96h96v96H64zm96 240c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm160-240h-96V96h96v96zm160 240c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm-96-240V96h66.02l80 96H384z" />
        </svg>
      );
    case "gear":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      );
    case "discover":
      // Nautical anchor (SVGRepo, CC0)
      return (
        <svg width="24" height="24" viewBox="0 0 266.955 266.955" fill={color}>
          <path d="M255.953,190.297l-18.683-37.132l-37.127,18.7c-5.722,2.883-8.028,9.856-5.145,15.577c2.883,5.727,9.866,8.017,15.583,5.145l4.351-2.187c-9.562,27.772-36.616,48.696-69.593,52.612V122.004h18.716c6.407,0,11.602-5.194,11.602-11.602s-5.194-11.607-11.602-11.607h-18.716V86.443c18.656-5.113,32.417-22.164,32.417-42.419C177.755,19.744,158.011,0,133.737,0S89.719,19.744,89.719,44.024c0,20.255,13.761,37.301,32.417,42.419v12.352h-17.769c-6.407,0-11.602,5.2-11.602,11.607s5.194,11.602,11.602,11.602h17.769v120.883c-32.183-4.161-58.557-24.525-68.298-51.568l2.54,1.273c5.738,2.877,12.7,0.577,15.583-5.145c2.883-5.722,0.577-12.695-5.145-15.577l-37.127-18.7l-18.683,37.132c-2.883,5.722-0.571,12.7,5.145,15.577c1.675,0.843,3.454,1.24,5.211,1.24c4.248,0,8.338-2.339,10.372-6.391l0.528-1.044c14.37,39.042,54.597,67.27,101.955,67.27c46.738,0,86.497-27.505,101.346-65.742c2.121,3.726,5.983,5.907,10.041,5.907c1.751,0,3.535-0.392,5.211-1.24C256.524,202.997,258.83,196.018,255.953,190.297z M112.922,44.024c0-11.482,9.333-20.815,20.815-20.815c11.482,0,20.815,9.333,20.815,20.815c0,11.471-9.339,20.81-20.815,20.81C122.26,64.834,112.922,55.495,112.922,44.024z" />
        </svg>
      );
  }
}

function LocationSelector({
  selected,
  onChange,
}: {
  selected: LocationId;
  onChange: (loc: LocationId) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = locations.find((l) => l.id === selected)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="neu-btn flex items-center gap-1.5 text-sm font-medium px-3 py-1.5"
      >
        <span className="text-xs">📍</span>
        <span>{current.name}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 neu-raised-lg overflow-hidden z-50 min-w-[160px]">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                onChange(loc.id);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                loc.id === selected
                  ? "text-text-heading font-medium"
                  : "text-text-light active:text-text"
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>("crew");
  const [selectedLocation, setSelectedLocation] =
    useState<LocationId>("nantucket");

  return (
    <div className="max-w-[430px] mx-auto min-h-screen flex flex-col relative" style={{ background: "#ECF0F3" }}>
      {/* Header */}
      <header className="neu-header px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button className="flex items-center gap-2.5 active:opacity-70 transition-opacity" onClick={() => setActiveTab("crew")}>
          <div className="neu-raised-sm w-9 h-9 flex items-center justify-center text-text-heading" style={{ borderRadius: "12px" }}>
            <CiscoLogo size={24} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-text-heading text-base font-bold tracking-wide leading-tight">
              Cisco Brewers
            </span>
            <span className="text-[9px] text-text-light tracking-widest uppercase leading-tight">
              Est. Nantucket
            </span>
          </div>
        </button>
        <LocationSelector
          selected={selectedLocation}
          onChange={setSelectedLocation}
        />
      </header>

      {/* Tab Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div key={activeTab} className="tab-content-enter">
          {activeTab === "crew" && <CrewTab />}
          {activeTab === "events" && (
            <EventsTab selectedLocation={selectedLocation} />
          )}
          {activeTab === "van" && (
            <VanTab selectedLocation={selectedLocation} />
          )}
          {activeTab === "gear" && <GearTab />}
          {activeTab === "discover" && <DiscoverTab />}
        </div>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] neu-tab-bar z-40">
        <div className="flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 pt-2 pb-1.5 px-1 flex-1 transition-colors ${
                  isActive ? "tab-active" : "tab-inactive"
                }`}
              >
                <TabIcon id={tab.id} active={isActive} />
                <span className="text-[10px] font-medium mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
