import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MaharashtraPulseDistrict } from '../../services/radarEngine';

interface Props {
  districts: MaharashtraPulseDistrict[];
  timeline: { date: string; district: string; category: string; headline: string; sourceUrl: string }[];
  onSelectDistrict: (dis: MaharashtraPulseDistrict) => void;
}

export function MaharashtraPulse({ districts, timeline, onSelectDistrict }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Maharashtra [19.7515, 75.7139], Zoom level 7
      const map = L.map(mapContainerRef.current, {
        center: [19.5, 75.8],
        zoom: 7,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Dark Matter Tile Layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Add glowing district markers with exact GPS coordinates
    districts.forEach((dis) => {
      const marker = L.circleMarker([dis.lat, dis.lng], {
        radius: 8,
        fillColor: '#4F8CFF',
        color: '#FFFFFF',
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.85
      }).addTo(map);

      marker.bindTooltip(
        `<div style="font-family: monospace; font-size: 11px; color: #fff; background: #111317; border: 1px solid rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 8px;">
          <strong style="color: #4F8CFF;">${dis.name}</strong><br/>
          ${dis.incidentCount} reported story
        </div>`,
        { permanent: false, direction: 'top' }
      );

      marker.on('click', () => {
        onSelectDistrict(dis);
      });
    });

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [districts, onSelectDistrict]);

  return (
    <div className="space-y-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#4F8CFF]" /> MAHARASHTRA PULSE
          </h2>
          <p className="text-xs text-[#8B909B] pt-0.5">Where cybercrime is being reported across Maharashtra districts.</p>
        </div>

        {/* Small Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#8B909B]">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#4F8CFF]" /> Financial</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#a78bfa]" /> Scam</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#10b981]" /> UPI</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#EF4444]" /> Women Safety</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#F59E0B]" /> Deepfake</span>
        </div>
      </div>

      {/* REAL LEAFLET DARK MAP CONTAINER */}
      <div className="relative w-full h-[400px] md:h-[460px] rounded-[28px] bg-[#0A0A0B] border border-white/[0.07] overflow-hidden shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-full z-10" />
      </div>

      {/* LATEST MAHARASHTRA TIMELINE */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
          <h3 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">LATEST MAHARASHTRA REPORTS</h3>
          <span className="text-xs font-mono text-[#8B909B]">Event Stream</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {timeline.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[#4F8CFF] font-bold shrink-0">{item.date}</span>
                <div>
                  <span className="text-white font-bold block">{item.district} &bull; <span className="text-[#8B909B] font-normal">{item.category}</span></span>
                  <p className="text-xs text-[#8B909B] font-sans pt-0.5">{item.headline}</p>
                </div>
              </div>

              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#4F8CFF] hover:underline shrink-0 flex items-center gap-1"
              >
                Source &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
