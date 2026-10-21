import { motion } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaRegClock, FaRegHeart, FaSun } from 'react-icons/fa';
import { CATEGORIES, formatMonths } from '../data/places';
import PlaceImage from './placeImage';

const PlaceCard = ({ place, isFavorite, onToggleFavorite, onOpen, onHover }) => {
  const category = CATEGORIES[place.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => onHover(place.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52 overflow-hidden">
        <PlaceImage place={place} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow" style={{ background: category?.color }}>
            {category?.label}
          </span>
          {place.unesco && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow">UNESCO</span>
          )}
        </div>
      </div>

      {/* Sits above the card-wide link so it can be clicked on its own. */}
      <button
        type="button"
        onClick={() => onToggleFavorite(place.id)}
        aria-label={isFavorite ? `Remove ${place.name} from saved places` : `Save ${place.name}`}
        aria-pressed={isFavorite}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2.5 shadow transition hover:scale-110"
      >
        {isFavorite ? <FaHeart className="text-rose-500" /> : <FaRegHeart className="text-ink/70" />}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-snug">
          <button
            type="button"
            onClick={() => onOpen(place)}
            className="text-left after:absolute after:inset-0 group-hover:text-lagoon"
          >
            {place.name}
          </button>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
          <FaMapMarkerAlt aria-hidden /> {place.region}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-ink/80">{place.shortDescription}</p>

        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs font-medium text-ink/60">
          <span className="flex items-center gap-1.5">
            <FaSun className="text-saffron-dark" aria-hidden /> {formatMonths(place.months)}
          </span>
          {place.duration && (
            <span className="flex items-center gap-1.5">
              <FaRegClock aria-hidden /> {place.duration}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default PlaceCard;
