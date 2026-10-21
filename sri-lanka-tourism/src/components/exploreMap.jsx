import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CATEGORIES } from '../data/places';

const SRI_LANKA_CENTER = [7.87, 80.77];
const SRI_LANKA_BOUNDS = [
  [5.4, 78.9],
  [10.3, 82.6],
];

const iconCache = new Map();
const pinIcon = (category, active) => {
  const key = `${category}-${active}`;
  if (!iconCache.has(key)) {
    const color = CATEGORIES[category]?.color ?? '#0f5e59';
    iconCache.set(
      key,
      L.divIcon({
        className: `map-pin${active ? ' is-active' : ''}`,
        html: `<span style="--pin-color:${color}"></span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 31],
        popupAnchor: [0, -30],
      }),
    );
  }
  return iconCache.get(key);
};

// Re-frames the map when the filtered places change, and flies to a focused place.
function MapController({ places, focus, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (places.length === 0) return;
    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    map.flyToBounds(bounds, { padding: [48, 48], maxZoom: 10, duration: 0.8 });
  }, [map, places]);

  useEffect(() => {
    if (!focus) return;
    const marker = markerRefs.current[focus.place.id];
    map.flyTo([focus.place.lat, focus.place.lng], 11, { duration: 1 });
    map.once('moveend', () => marker?.openPopup());
  }, [map, focus, markerRefs]);

  return null;
}

const ExploreMap = ({ places, focus, highlightedId, onOpenPlace }) => {
  const markerRefs = useRef({});
  const activeId = highlightedId ?? focus?.place.id;

  // Draw the highlighted marker last so it sits on top of its neighbours.
  const ordered = useMemo(
    () => [...places].sort((a, b) => (a.id === activeId) - (b.id === activeId)),
    [places, activeId],
  );

  return (
    <MapContainer
      center={SRI_LANKA_CENTER}
      zoom={7}
      minZoom={7}
      maxBounds={SRI_LANKA_BOUNDS}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <MapController places={places} focus={focus} markerRefs={markerRefs} />

      {ordered.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={pinIcon(place.category, place.id === activeId)}
          zIndexOffset={place.id === activeId ? 1000 : 0}
          title={place.name}
          ref={(marker) => {
            if (marker) markerRefs.current[place.id] = marker;
            else delete markerRefs.current[place.id];
          }}
        >
          <Popup>
            <div>
              {place.image && (
                <img src={place.image} alt="" className="h-28 w-full object-cover" referrerPolicy="no-referrer" />
              )}
              <div className="p-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: CATEGORIES[place.category]?.color }}>
                  {CATEGORIES[place.category]?.label}
                </p>
                <p className="font-display text-base font-bold leading-snug text-ink">{place.name}</p>
                <p className="mb-3 text-xs text-gray-500">{place.region}</p>
                <button
                  type="button"
                  onClick={() => onOpenPlace(place)}
                  className="w-full rounded-lg bg-lagoon py-2 text-sm font-semibold text-white hover:bg-lagoon-light"
                >
                  View details
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ExploreMap;
