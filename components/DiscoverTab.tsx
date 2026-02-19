"use client";

import { beers, spirits, locations, beerEmojis, spiritEmojis } from "@/lib/data";
import { CiscoLogo } from "./CiscoLogo";

export function DiscoverTab() {
  return (
    <div className="py-5 space-y-6">
      {/* Our Story */}
      <section className="px-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-text-heading">
            <CiscoLogo size={36} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-text-heading leading-tight">
              Our Story
            </h1>
            <p className="text-[10px] text-text-light tracking-widest uppercase">
              Nantucket, MA · Since 1995
            </p>
          </div>
        </div>
        <div className="neu-raised rounded-2xl p-5">
          <p className="text-text text-sm leading-relaxed">
            Born on the stovetop of a Nantucket loft in 1995, Cisco Brewers
            started as the country's only outdoor brewery. Today we brew,
            distill, and make wine across four locations — but we've never lost
            the island spirit that started it all.
          </p>
          <p className="text-text-light text-xs italic mt-3">
            "The happiest place on earth"
          </p>
          <button className="text-brand text-sm font-medium mt-3 active:opacity-60">
            Read More →
          </button>
        </div>
      </section>

      {/* Our Beers */}
      <section>
        <h2 className="font-display text-xl font-bold text-text-heading mb-1 px-4">
          Our Beers
        </h2>
        <p className="text-text-light text-xs px-4 mb-3">
          Brewed on the island, enjoyed everywhere.
        </p>
        <div className="scroll-snap-x flex gap-3 px-4 pb-2">
          {beers.map((beer) => (
            <div
              key={beer.name}
              className="scroll-snap-item flex-shrink-0 w-[200px] neu-raised rounded-2xl overflow-hidden"
            >
              <div className="neu-inset-sm h-28 flex items-center justify-center m-2 overflow-hidden" style={{ borderRadius: "12px" }}>
                {beer.image ? (
                  <img src={beer.image} alt={beer.name} className="h-full w-full object-contain p-2" />
                ) : (
                  <span className="text-4xl">{beerEmojis[beer.name] || "🍺"}</span>
                )}
              </div>
              <div className="p-3 pt-1">
                <h3 className="text-sm font-bold text-text-heading leading-snug">
                  {beer.name}
                </h3>
                <p className="text-text-light text-xs mt-0.5">
                  {beer.style} · {beer.abv}% ABV
                </p>
                <p className="text-text text-xs mt-2 leading-relaxed">
                  {beer.description}
                </p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-1" />
        </div>
      </section>

      {/* Triple Eight Distillery */}
      <section className="px-4">
        <h2 className="font-display text-xl font-bold text-text-heading mb-1">
          Triple Eight Distillery
        </h2>
        <p className="text-text-light text-xs mb-3">
          Sister brand · Well #888, Nantucket
        </p>
        <div className="neu-raised rounded-2xl p-5 mb-3">
          <p className="text-text text-sm leading-relaxed">
            From well #888 on Nantucket, Triple Eight Distillery crafts vodka,
            whiskey, gin, and more. What started as a way to fund a five-year
            whiskey dream became a world-class spirits operation.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {spirits.map((spirit) => (
            <div
              key={spirit.name}
              className="neu-raised rounded-2xl p-3 text-center"
            >
              {spirit.image ? (
                <div className="h-16 flex items-center justify-center mb-1.5">
                  <img src={spirit.image} alt={spirit.name} className="h-full object-contain" />
                </div>
              ) : (
                <span className="text-2xl block mb-1.5">{spiritEmojis[spirit.name] || "🥃"}</span>
              )}
              <h4 className="text-xs font-bold text-text-heading leading-snug">
                {spirit.name}
              </h4>
              <p className="text-[10px] text-text-light mt-0.5">{spirit.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Locations */}
      <section className="px-4">
        <h2 className="font-display text-xl font-bold text-text-heading mb-1">
          Our Locations
        </h2>
        <p className="text-text-light text-xs mb-3">
          Four taprooms, one island spirit.
        </p>
        <div className="space-y-3">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="neu-raised rounded-2xl overflow-hidden"
            >
              <div className="neu-inset-sm h-20 m-2 overflow-hidden" style={{ borderRadius: "12px" }}>
                <img
                  src={`/images/locations/${loc.id}.jpg`}
                  alt={loc.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 pt-1">
                <h3 className="font-display font-bold text-text-heading">
                  {loc.name}
                </h3>
                <p className="text-text-light text-xs mt-1">{loc.address}</p>
                <p className="text-text-light text-xs mt-0.5">{loc.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
