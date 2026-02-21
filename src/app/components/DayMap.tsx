"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapLocation {
  lat: number;
  lng: number;
  title: string;
  icon: string;
  time: string;
}

interface DayMapProps {
  locations: MapLocation[];
  color: string;
}

function createNumberedIcon(num: number, color: string) {
  return L.divIcon({
    className: "numbered-marker",
    html: `<div style="background:${color};color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${num}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

const colorMap: Record<string, string> = {
  "from-rose-400 to-pink-500": "#f43f5e",
  "from-cyan-400 to-blue-500": "#06b6d4",
  "from-amber-400 to-orange-500": "#f59e0b",
  "from-emerald-400 to-teal-500": "#10b981",
  "from-violet-400 to-purple-500": "#8b5cf6",
};

export default function DayMap({ locations, color }: DayMapProps) {
  if (locations.length === 0) return null;

  const hexColor = colorMap[color] || "#f43f5e";
  const positions: [number, number][] = locations.map((loc) => [loc.lat, loc.lng]);

  // Calculate center from all locations
  const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

  return (
    <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200" style={{ height: "350px" }}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]} icon={createNumberedIcon(i + 1, hexColor)}>
            <Popup>
              <div style={{ textAlign: "center", fontFamily: "Noto Sans KR, sans-serif" }}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{loc.icon}</div>
                <div style={{ fontWeight: "bold", fontSize: "13px" }}>{loc.title}</div>
                <div style={{ color: "#888", fontSize: "11px", marginTop: "2px" }}>{loc.time}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        <Polyline positions={positions} color={hexColor} weight={3} opacity={0.7} dashArray="8 4" />
      </MapContainer>
    </div>
  );
}
