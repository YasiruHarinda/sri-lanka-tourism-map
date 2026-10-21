import { FaHeart, FaSearch, FaTimes } from 'react-icons/fa';
import { CATEGORIES, MONTHS } from '../data/places';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const chipClass = (active) =>
  `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
    active ? 'border-lagoon bg-lagoon text-white shadow' : 'border-ink/15 bg-white text-ink hover:border-lagoon/50'
  }`;

const Filters = ({ filters, onChange, counts, resultCount, favoriteCount }) => {
  const set = (patch) => onChange({ ...filters, ...patch });
  const isFiltered = filters.query || filters.category !== 'all' || filters.month || filters.favoritesOnly;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search places</span>
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Search places, regions or things to do…"
            className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-4 shadow-sm outline-none focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
          />
        </label>

        <label className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 shadow-sm">
          <span className="whitespace-nowrap text-sm text-ink/60">Travelling in</span>
          <select
            value={filters.month}
            onChange={(e) => set({ month: Number(e.target.value) })}
            className="cursor-pointer bg-transparent py-3 pr-1 font-medium outline-none"
          >
            <option value={0}>Any month</option>
            {MONTH_NAMES.map((name, i) => (
              <option key={name} value={i + 1}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={chipClass(filters.category === 'all')} onClick={() => set({ category: 'all' })}>
          All <span className="opacity-60">{counts.all}</span>
        </button>
        {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
          <button key={key} type="button" className={chipClass(filters.category === key)} onClick={() => set({ category: key })}>
            <span className="h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: color }} aria-hidden />
            {label} <span className="opacity-60">{counts[key] ?? 0}</span>
          </button>
        ))}
        <button
          type="button"
          aria-pressed={filters.favoritesOnly}
          className={chipClass(filters.favoritesOnly)}
          onClick={() => set({ favoritesOnly: !filters.favoritesOnly })}
        >
          <FaHeart className={filters.favoritesOnly ? 'text-rose-300' : 'text-rose-500'} aria-hidden />
          Saved <span className="opacity-60">{favoriteCount}</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-ink/60" aria-live="polite">
        <span>
          Showing <strong className="text-ink">{resultCount}</strong> {resultCount === 1 ? 'place' : 'places'}
          {filters.month > 0 && <> in season in {MONTHS[filters.month - 1]}</>}
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={() => onChange({ query: '', category: 'all', month: 0, favoritesOnly: false })}
            className="inline-flex items-center gap-1 font-medium text-lagoon hover:underline"
          >
            <FaTimes aria-hidden /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
