import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaSearchLocation } from 'react-icons/fa';
import HeroMap from './components/heroMap';
import ExploreMap from './components/exploreMap';
import Filters from './components/filters';
import PlaceCard from './components/placecard';
import PlaceModal from './components/placeModal';
import TravelTips from './components/travelTips';
import { usePlaces } from './hooks/usePlaces';
import { useFavorites } from './hooks/useFavorites';

const DEFAULT_FILTERS = { query: '', category: 'all', month: 0, favoritesOnly: false };

const matchesQuery = (place, query) => {
  if (!query) return true;
  const haystack = [place.name, place.region, place.shortDescription, ...(place.highlights ?? [])].join(' ').toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

function App() {
  const { places, source } = usePlaces();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapFocus, setMapFocus] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const mapSectionRef = useRef(null);

  // Everything except the category filter, so the chips can show how many places each category would have.
  const baseFiltered = useMemo(
    () =>
      places.filter(
        (p) =>
          matchesQuery(p, filters.query.trim()) &&
          (!filters.month || p.months.includes(filters.month)) &&
          (!filters.favoritesOnly || favorites.includes(p.id)),
      ),
    [places, filters.query, filters.month, filters.favoritesOnly, favorites],
  );

  const filteredPlaces = useMemo(
    () => (filters.category === 'all' ? baseFiltered : baseFiltered.filter((p) => p.category === filters.category)),
    [baseFiltered, filters.category],
  );

  const counts = useMemo(() => {
    const result = { all: baseFiltered.length };
    for (const p of baseFiltered) result[p.category] = (result[p.category] ?? 0) + 1;
    return result;
  }, [baseFiltered]);

  const closeModal = useCallback(() => setSelectedPlace(null), []);

  const showOnMap = useCallback((place) => {
    setSelectedPlace(null);
    // A fresh object each time so clicking "Show on map" twice still re-focuses.
    setMapFocus({ place });
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const showFavorites = () => {
    setFilters({ ...DEFAULT_FILTERS, favoritesOnly: true });
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="top">
      <HeroMap
        placeCount={places.length}
        unescoCount={places.filter((p) => p.unesco).length}
        favoriteCount={favorites.length}
        onShowFavorites={showFavorites}
      />

      <main>
        <section id="map" ref={mapSectionRef} className="scroll-mt-4 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-lagoon">Interactive map</p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">Where do you want to go?</h2>
              <p className="mt-3 text-ink/70">
                Click a pin for a quick preview, or open any place for highlights, the best months to visit and directions.
              </p>
            </div>

            <Filters
              filters={filters}
              onChange={setFilters}
              counts={counts}
              resultCount={filteredPlaces.length}
              favoriteCount={favorites.length}
            />

            <div className="relative z-0 mt-6 h-[60vh] min-h-[420px] overflow-hidden rounded-3xl shadow-lg ring-1 ring-ink/10">
              <ExploreMap
                places={filteredPlaces}
                focus={mapFocus}
                highlightedId={hoveredId}
                onOpenPlace={setSelectedPlace}
              />
            </div>
          </div>
        </section>

        <section id="places" className="scroll-mt-4 pb-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-display text-3xl font-bold">
              {filters.favoritesOnly ? 'Your saved places' : 'All destinations'}
            </h2>

            {filteredPlaces.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      isFavorite={isFavorite(place.id)}
                      onToggleFavorite={toggleFavorite}
                      onOpen={setSelectedPlace}
                      onHover={setHoveredId}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-ink/15 py-16 text-center">
                <FaSearchLocation className="mx-auto mb-4 text-4xl text-ink/30" aria-hidden />
                <p className="font-semibold">No places match those filters.</p>
                <p className="mt-1 text-sm text-ink/60">
                  {filters.favoritesOnly && favorites.length === 0
                    ? 'Tap the heart on any place to save it here.'
                    : 'Try a different search, month or category.'}
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-5 rounded-full bg-lagoon px-5 py-2 text-sm font-semibold text-white hover:bg-lagoon-light"
                >
                  Show all places
                </button>
              </div>
            )}
          </div>
        </section>

        <TravelTips />
      </main>

      <footer className="bg-ink py-10 text-sm text-white/60">
        <div className="container mx-auto flex flex-col gap-2 px-4 md:flex-row md:justify-between">
          <p>Discover Sri Lanka · an interactive travel map</p>
          <p>
            Photos from Wikimedia Commons · Map data © OpenStreetMap contributors
            {source === 'firestore' && ' · Places loaded from Firestore'}
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedPlace && (
          <PlaceModal
            key={selectedPlace.id}
            place={selectedPlace}
            isFavorite={isFavorite(selectedPlace.id)}
            onToggleFavorite={toggleFavorite}
            onClose={closeModal}
            onShowOnMap={showOnMap}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
