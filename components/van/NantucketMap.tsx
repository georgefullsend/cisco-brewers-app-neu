"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ROUTE_COORDINATES,
  MAP_CENTER,
  MAP_ZOOM,
  CISCO_BREWERS,
  DOWNTOWN_PICKUP,
} from "./routeData";

// Shuttle van icon — matches the footer tab bar icon (Font Awesome, CC BY 4.0)
const vanIcon = L.divIcon({
  className: "van-marker",
  html: `<div class="van-marker-inner"><svg width="20" height="18" viewBox="0 -64 640 640" fill="currentColor"><path d="M628.88 210.65L494.39 49.27A48.01 48.01 0 0 0 457.52 32H32C14.33 32 0 46.33 0 64v288c0 17.67 14.33 32 32 32h32c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h32c17.67 0 32-14.33 32-32V241.38c0-11.23-3.94-22.1-11.12-30.73zM64 192V96h96v96H64zm96 240c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm160-240h-96V96h96v96zm160 240c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm-96-240V96h66.02l80 96H384z"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Endpoint markers — small neumorphic dots
function makeEndpointIcon(emoji: string) {
  return L.divIcon({
    className: "endpoint-marker",
    html: `<div class="endpoint-marker-inner">${emoji}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

// Both endpoints use standard teardrop pin icons
const breweryIcon = makeEndpointIcon(
  `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>`
);
const pickupIcon = makeEndpointIcon(
  `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/></svg>`
);

// Constrains the map view to the route area
function MapController() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(ROUTE_COORDINATES);
    map.fitBounds(bounds.pad(0.15));
    map.setMinZoom(12);
    map.setMaxZoom(16);
  }, [map]);
  return null;
}

// Van that steps through waypoints with smooth CSS transition
function AnimatedVan() {
  const [index, setIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const maxIndex = ROUTE_COORDINATES.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (forward && prev >= maxIndex) {
          setForward(false);
          return prev - 1;
        }
        if (!forward && prev <= 0) {
          setForward(true);
          return 1;
        }
        return forward ? prev + 1 : prev - 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [forward, maxIndex]);

  return (
    <Marker
      position={ROUTE_COORDINATES[index]}
      icon={vanIcon}
      zIndexOffset={1000}
    />
  );
}

// Route progress trail — filled portion behind the van
function RouteTrail({ vanIndex }: { vanIndex: number }) {
  const trail = useMemo(
    () => ROUTE_COORDINATES.slice(0, vanIndex + 1),
    [vanIndex]
  );
  if (trail.length < 2) return null;
  return (
    <Polyline
      positions={trail}
      pathOptions={{
        color: "#8A95A8",
        weight: 4,
        opacity: 0.6,
        lineCap: "round",
        lineJoin: "round",
      }}
    />
  );
}

export function NantucketMap() {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      attributionControl={false}
      doubleClickZoom={false}
      touchZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapController />

      {/* Route line */}
      <Polyline
        positions={ROUTE_COORDINATES}
        pathOptions={{
          color: "#B8C5D6",
          weight: 3,
          opacity: 0.7,
          dashArray: "8, 5",
          lineCap: "round",
          lineJoin: "round",
        }}
      />

      {/* Endpoint markers */}
      <Marker position={CISCO_BREWERS} icon={breweryIcon} />
      <Marker position={DOWNTOWN_PICKUP} icon={pickupIcon} />

      {/* Animated van */}
      <AnimatedVan />
    </MapContainer>
  );
}
