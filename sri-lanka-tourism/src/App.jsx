import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroMap from './components/heroMap';
import PlaceCard from './components/placecard';
import PlaceModal from './components/placeModal';
import { usePlaces } from './hooks/usePlaces';

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { places, loading, error } = usePlaces();
  const { scrollYProgress } = useScroll();
  
  // Map disappears as you scroll
  const mapOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const mapScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Map Section */}
      <motion.div
        style={{ opacity: mapOpacity, scale: mapScale }}
        className="fixed top-0 left-0 w-full h-screen z-0"
      >
        <HeroMap places={places} />
      </motion.div>

      {/* Spacer to allow scroll */}
      <div className="h-screen" />

      {/* Places Grid Section */}
      <div className="relative z-10 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Explore Paradise
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From ancient ruins to pristine beaches, discover the wonders of Sri Lanka
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {places.map((place, index) => (
              <PlaceCard
                key={place.id}
                place={place}
                index={index}
                onClick={setSelectedPlace}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}

export default App;