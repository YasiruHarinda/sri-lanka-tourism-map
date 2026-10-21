import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheck,
  FaDirections,
  FaExternalLinkAlt,
  FaHeart,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaRegHeart,
  FaTimes,
} from 'react-icons/fa';
import { CATEGORIES, MONTHS, formatMonths } from '../data/places';
import PlaceImage from './placeImage';

const PlaceModal = ({ place, isFavorite, onToggleFavorite, onClose, onShowOnMap }) => {
  const closeRef = useRef(null);
  const category = CATEGORIES[place.category];

  // Close on Escape, lock page scroll, and move focus into the dialog.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="place-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-sand shadow-2xl sm:rounded-3xl"
      >
        <div className="relative h-64 sm:h-80">
          <PlaceImage place={place} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-black/40 p-3 text-white backdrop-blur hover:bg-black/60"
          >
            <FaTimes />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: category?.color }}>
                {category?.label}
              </span>
              {place.unesco && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                  UNESCO World Heritage
                </span>
              )}
            </div>
            <h2 id="place-title" className="font-display text-3xl font-bold sm:text-4xl">
              {place.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-white/80">
              <FaMapMarkerAlt aria-hidden /> {place.region}
            </p>
          </div>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <p className="text-lg leading-relaxed text-ink/85">{place.description}</p>

          {place.highlights?.length > 0 && (
            <section>
              <h3 className="mb-3 font-display text-lg font-bold">Don&apos;t miss</h3>
              <ul className="grid gap-2 sm:grid-cols-3">
                {place.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm shadow-sm ring-1 ring-ink/5">
                    <FaCheck className="mt-0.5 shrink-0 text-lagoon" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-bold">Best time to visit</h3>
              <span className="text-sm font-medium text-lagoon">{formatMonths(place.months)}</span>
            </div>
            <ol className="grid grid-cols-6 gap-1 sm:grid-cols-12" aria-label="Months in season">
              {MONTHS.map((m, i) => {
                const inSeason = place.months.includes(i + 1);
                return (
                  <li
                    key={m}
                    className={`rounded-md py-2 text-center text-xs font-semibold ${
                      inSeason ? 'bg-saffron text-ink' : 'bg-ink/5 text-ink/40'
                    }`}
                  >
                    {m}
                    <span className="sr-only">{inSeason ? ' (in season)' : ''}</span>
                  </li>
                );
              })}
            </ol>
          </section>

          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 text-sm shadow-sm ring-1 ring-ink/5">
            {place.duration && (
              <div>
                <dt className="text-ink/50">Suggested time</dt>
                <dd className="font-semibold">{place.duration}</dd>
              </div>
            )}
            <div>
              <dt className="text-ink/50">Coordinates</dt>
              <dd className="font-mono font-semibold">
                {place.lat.toFixed(4)}°N, {place.lng.toFixed(4)}°E
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onShowOnMap(place)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-lagoon py-3 font-semibold text-white hover:bg-lagoon-light"
            >
              <FaMapMarkedAlt aria-hidden /> Show on map
            </button>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold ring-1 ring-ink/15 hover:ring-lagoon"
            >
              <FaDirections aria-hidden /> Directions
            </a>
            <button
              type="button"
              onClick={() => onToggleFavorite(place.id)}
              aria-pressed={isFavorite}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold ring-1 ring-ink/15 hover:ring-rose-400"
            >
              {isFavorite ? <FaHeart className="text-rose-500" aria-hidden /> : <FaRegHeart aria-hidden />}
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>

          {place.wiki && (
            <a
              href={place.wiki}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-lagoon hover:underline"
            >
              Read more on Wikipedia <FaExternalLinkAlt className="text-xs" aria-hidden />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlaceModal;
