import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PlaceCard = ({ place, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => onClick(place)}
      className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20"
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-purple-700">
            {place.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
          {place.name}
        </h3>
        
        <div className="flex items-center text-blue-200 mb-3">
          <FaMapMarkerAlt className="mr-2" />
          <span className="text-sm">{place.region}</span>
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
          {place.shortDescription}
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          Learn More
        </motion.button>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default PlaceCard;