"use client";

import { gearProducts } from "@/lib/data";
import { CiscoLogo } from "./CiscoLogo";

const productEmojis: Record<string, string> = {
  Hats: "🧢",
  Shirts: "👕",
  Outerwear: "🧥",
  Drinkware: "🍺",
  Accessories: "🎒",
};

export function GearTab() {
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Hero banner */}
      <div className="neu-inset rounded-2xl p-6">
        <div className="text-center">
          <div className="text-text-light mx-auto mb-3">
            <CiscoLogo size={40} />
          </div>
          <h1 className="font-display text-text-heading text-2xl font-bold mb-0.5">
            Cisco Gear
          </h1>
          <p className="text-text-light text-sm mb-4">
            Rep the island wherever you are.
          </p>
          <button className="neu-btn-accent text-sm px-6 py-2.5 active:scale-95 transition-transform">
            Shop Now →
          </button>
        </div>
      </div>

      {/* Crew perk banner */}
      <div className="neu-raised rounded-2xl px-4 py-3 flex items-start gap-2">
        <span className="text-lg flex-shrink-0">🎁</span>
        <p className="text-sm text-text leading-snug">
          <span className="font-semibold text-text-heading">Crew Perk:</span> Members get early
          access to seasonal drops + free shipping on orders over $50
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3">
        {gearProducts.map((product) => (
          <button
            key={product.id}
            className="neu-raised rounded-2xl overflow-hidden card-press text-left"
          >
            <div className="neu-inset-sm aspect-square flex items-center justify-center m-2 overflow-hidden" style={{ borderRadius: "12px" }}>
              {product.image ? (
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-4xl">{productEmojis[product.category] || "🛍️"}</span>
              )}
            </div>
            <div className="p-3 pt-1">
              <h3 className="text-sm font-semibold text-text-heading leading-snug">
                {product.name}
              </h3>
              <p className="text-accent-warm font-bold text-sm mt-1">
                ${product.price}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
