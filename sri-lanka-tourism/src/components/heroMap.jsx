import { motion } from 'framer-motion';
import { FaArrowDown, FaHeart, FaMapMarkedAlt } from 'react-icons/fa';
import { commons } from '../data/places';

const heroImage = commons('e/e6/Sigiriya_%28141688197%29.jpeg', 1280);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

const HeroMap = ({ placeCount, unescoCount, favoriteCount, onShowFavorites }) => {
  const stats = [
    { value: placeCount, label: 'handpicked places' },
    { value: unescoCount, label: 'UNESCO-listed sites' },
    { value: '1,340 km', label: 'of coastline' },
  ];

  return (
    <header className="relative isolate flex min-h-[88vh] flex-col overflow-hidden bg-lagoon-dark text-white">
      <img src={heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-lagoon-dark via-lagoon-dark/70 to-black/40" />

      <nav className="container mx-auto flex items-center justify-between px-4 py-5">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold">
          <FaMapMarkedAlt className="text-saffron" aria-hidden />
          Discover Sri Lanka
        </a>
        <div className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <a href="#map" className="hidden rounded-full px-3 py-2 hover:bg-white/10 sm:block">Map</a>
          <a href="#places" className="hidden rounded-full px-3 py-2 hover:bg-white/10 sm:block">Places</a>
          <a href="#plan" className="hidden rounded-full px-3 py-2 hover:bg-white/10 sm:block">Plan your trip</a>
          <button
            type="button"
            onClick={onShowFavorites}
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"
          >
            <FaHeart className="text-rose-300" aria-hidden />
            <span>Saved</span>
            <span className="rounded-full bg-saffron px-2 text-xs font-bold text-ink">{favoriteCount}</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto mt-auto px-4 pb-16 pt-24">
        <motion.p {...fadeUp(0)} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-saffron">
          The Pearl of the Indian Ocean
        </motion.p>
        <motion.h1 {...fadeUp(0.1)} className="max-w-3xl font-display text-5xl font-bold leading-tight md:text-7xl">
          Ancient cities, wild coasts and misty tea country.
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-lg text-white/80">
          Explore Sri Lanka&apos;s best places on an interactive map. Filter by what you love and the month you
          travel, and save your favourites as you go.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#map"
            className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 font-semibold text-ink shadow-lg transition hover:bg-saffron-dark"
          >
            Explore the map <FaArrowDown aria-hidden />
          </a>
          <a
            href="#plan"
            className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            When to go
          </a>
        </motion.div>

        <motion.dl {...fadeUp(0.4)} className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/20 pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-bold md:text-4xl">{s.value}</dd>
              <dd className="text-sm text-white/70">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </header>
  );
};

export default HeroMap;
