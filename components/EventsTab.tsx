"use client";

import { useState, useMemo } from "react";
import type { LocationId, CiscoEvent } from "@/lib/types";
import { events } from "@/lib/data";

function getTagClass(type: CiscoEvent["type"]) {
  const map: Record<string, string> = {
    "Live Music": "tag-live-music",
    Trivia: "tag-trivia",
    Tasting: "tag-tasting",
    Festival: "tag-festival",
    Special: "tag-special",
    Food: "tag-food",
  };
  return map[type] || "bg-base-dark text-text";
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function EventsTab({
  selectedLocation,
}: {
  selectedLocation: LocationId;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const locationEvents = useMemo(
    () => events.filter((e) => e.location === selectedLocation),
    [selectedLocation]
  );

  const monthEventDates = useMemo(() => {
    const dates = new Map<number, number>();
    locationEvents.forEach((e) => {
      const d = new Date(e.date + "T00:00:00");
      if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        dates.set(d.getDate(), (dates.get(d.getDate()) || 0) + 1);
      }
    });
    return dates;
  }, [locationEvents, viewYear, viewMonth]);

  const filteredEvents = useMemo(() => {
    if (selectedDay !== null) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
      return locationEvents.filter((e) => e.date === dateStr);
    }
    return locationEvents
      .filter((e) => {
        const d = new Date(e.date + "T00:00:00");
        return (
          d.getFullYear() > viewYear ||
          (d.getFullYear() === viewYear && d.getMonth() >= viewMonth)
        );
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [locationEvents, selectedDay, viewYear, viewMonth]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDay(null);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDay(null);
  }

  return (
    <div className="px-4 py-5">
      {/* Calendar */}
      <div className="neu-raised rounded-2xl p-4 mb-5">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            className="neu-btn w-8 h-8 flex items-center justify-center"
            style={{ borderRadius: "999px" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <h2 className="font-display text-lg font-bold text-text-heading">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>
          <button
            onClick={nextMonth}
            className="neu-btn w-8 h-8 flex items-center justify-center"
            style={{ borderRadius: "999px" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="text-center text-xs text-text-light font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const eventCount = monthEventDates.get(day) || 0;
            const isSelected = selectedDay === day;
            const isToday =
              day === today.getDate() &&
              viewMonth === today.getMonth() &&
              viewYear === today.getFullYear();

            return (
              <button
                key={day}
                onClick={() =>
                  setSelectedDay(selectedDay === day ? null : day)
                }
                className={`relative flex flex-col items-center py-1.5 text-sm transition-all ${
                  isSelected
                    ? "neu-inset-sm text-text-heading font-bold"
                    : isToday
                      ? "neu-raised-sm text-text-heading font-semibold"
                      : "text-text-light"
                }`}
                style={{ borderRadius: "12px" }}
              >
                {day}
                {eventCount > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: Math.min(eventCount, 3) }).map(
                      (_, j) => (
                        <div
                          key={j}
                          className="w-1 h-1 rounded-full"
                          style={{ background: isSelected ? "#5A5E62" : "#B0CCC8" }}
                        />
                      )
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event List */}
      <div>
        <h2 className="font-display text-lg font-bold text-text-heading mb-3">
          {selectedDay
            ? `${MONTH_NAMES[viewMonth]} ${selectedDay}`
            : "Upcoming Events"}
        </h2>
        {filteredEvents.length === 0 ? (
          <p className="text-text-light text-sm text-center py-8">
            No events {selectedDay ? "on this day" : "coming up"} at this
            location.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const eventDate = new Date(event.date + "T00:00:00");
              const isExpanded = expandedEvent === event.id;

              return (
                <button
                  key={event.id}
                  onClick={() =>
                    setExpandedEvent(isExpanded ? null : event.id)
                  }
                  className="w-full text-left neu-raised rounded-2xl overflow-hidden card-press"
                >
                  <div className="flex gap-3 p-4">
                    {/* Date block */}
                    <div className="flex-shrink-0 w-12 text-center">
                      <div className="text-2xl font-display font-bold text-text-heading leading-none">
                        {eventDate.getDate()}
                      </div>
                      <div className="text-[10px] text-text-light font-medium uppercase mt-0.5">
                        {eventDate.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </div>
                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-text-heading leading-snug">
                          {event.name}
                        </h3>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${getTagClass(
                            event.type
                          )}`}
                        >
                          {event.type}
                        </span>
                      </div>
                      <p className="text-xs text-text-light mt-1">
                        {event.time}
                      </p>
                    </div>
                  </div>
                  {/* Expanded detail */}
                  {isExpanded && event.description && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="neu-inset-sm rounded-xl p-3 mt-1">
                        <p className="text-sm text-text leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="neu-btn text-xs px-3 py-1.5 font-medium">
                          📅 Add to Calendar
                        </span>
                        <span className="neu-btn text-xs px-3 py-1.5 font-medium">
                          📤 Share
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
