"use client";

import { useState, useEffect } from "react";
import { CiscoLogo } from "./CiscoLogo";

type ScanState = "scanning" | "success";

export function QRScannerModal({
  onClose,
  onStampEarned,
}: {
  onClose: () => void;
  onStampEarned: () => void;
}) {
  const [state, setState] = useState<ScanState>("scanning");

  useEffect(() => {
    if (state === "scanning") {
      const timer = setTimeout(() => {
        setState("success");
        onStampEarned();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [state, onStampEarned]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 qr-backdrop-enter"
        onClick={state === "success" ? onClose : undefined}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-[340px] mx-4">
        {state === "scanning" ? (
          <div className="qr-modal-enter">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white/80 active:text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Viewfinder */}
            <div className="relative aspect-square rounded-3xl overflow-hidden" style={{ background: "#1a1a2e" }}>
              {/* Scan region */}
              <div className="absolute inset-8 rounded-2xl">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-white/80 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-white/80 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-white/80 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-white/80 rounded-br-lg" />

                {/* Scan line */}
                <div className="qr-scan-line absolute left-2 right-2 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #B0CCC8, transparent)" }} />
              </div>

              {/* Grid dots */}
              <div className="absolute inset-12 grid grid-cols-5 grid-rows-5 gap-3 opacity-20">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white mx-auto my-auto" />
                ))}
              </div>
            </div>

            {/* Label */}
            <div className="text-center mt-4">
              <p className="text-white font-display font-bold text-lg">
                Scan Your QR Code
              </p>
              <p className="text-white/50 text-sm mt-1 flex items-center justify-center gap-2">
                <span className="qr-pulse-dot w-2 h-2 rounded-full inline-block" style={{ background: "#B0CCC8" }} />
                Scanning...
              </p>
            </div>
          </div>
        ) : (
          <div className="qr-success-enter text-center">
            {/* Success card */}
            <div className="neu-raised-lg rounded-3xl p-8 relative overflow-hidden">
              {/* Stamp icon with pop animation */}
              <div className="qr-stamp-pop mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #D6C4B0, #C8B8A4)" }}>
                <CiscoLogo size={44} className="text-white" />
              </div>

              {/* Checkmark ring */}
              <div className="qr-check-draw mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#C4D4C0" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5E705A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="font-display text-text-heading text-xl font-bold">
                Stamp Earned!
              </h2>
              <p className="text-text text-sm mt-1">
                Enjoy your pint, crew member.
              </p>

              {/* Dismiss button */}
              <button
                onClick={onClose}
                className="neu-btn-accent text-sm px-8 py-2.5 mt-5 active:scale-95 transition-transform"
              >
                Nice!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
