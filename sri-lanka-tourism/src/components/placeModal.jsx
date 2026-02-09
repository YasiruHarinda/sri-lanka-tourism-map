import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const PlaceModal = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
          >
            <FaTimes className="text-white text-xl" />
          </button>

          {/* Image */}
          <div className="relative h-96 overflow-hidden rounded-t-3xl">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {place.name}
              </motion.h2>
              <div className="flex items-center gap-4">
                <span className="px-4 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  {place.category}
                </span>
                <div className="flex items-center text-white">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{place.region}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">About this place</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-all"
              >
                <FaHeart className="text-red-400 text-xl" />
              </motion.button>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              {place.fullDescription}
            </p>

            {/* Location coordinates */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-3">Location Details</h4>
              <div className="grid grid-cols-2 gap-4 text-gray-400">
                <div>
                  <p className="text-sm">Latitude</p>
                  <p className="text-white font-mono">{place.latitude}°</p>
                </div>
                <div>
                  <p className="text-sm">Longitude</p>
                  <p className="text-white font-mono">{place.longitude}°</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Plan Visit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                View on Map
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceModal;