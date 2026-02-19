"use client";

import { useState, useRef, useEffect } from "react";
import type { LocationId } from "@/lib/types";
import { locations } from "@/lib/data";

export function LocationSelector({
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
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
