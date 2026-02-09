import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroMap = ({ places }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(50)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    })));
  }, []);

  // Sri Lanka outline path (simplified SVG path)
  const sriLankaPath = "M150,50 Q180,40 200,60 L210,100 Q215,140 200,180 L180,240 Q160,270 140,280 L100,285 Q70,280 55,260 L40,220 Q35,180 45,140 L60,100 Q80,60 110,50 Z";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: particle.duration, 
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-white text-center mb-8"
        >
          Discover Sri Lanka
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-blue-200 text-center mb-12 max-w-2xl"
        >
          Pearl of the Indian Ocean - Where Every Corner Tells a Story
        </motion.p>

        {/* Animated Sri Lanka Map */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="relative w-full max-w-2xl h-96"
        >
          <svg
            viewBox="0 0 300 350"
            className="w-full h-full drop-shadow-2xl"
          >
            {/* Map outline with gradient */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d={sriLankaPath}
              fill="url(#mapGradient)"
              stroke="#ffffff"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />

            {/* Animated location markers */}
            {places.slice(0, 4).map((place, index) => {
              const positions = [
                { x: 150, y: 100 },  // North-Central
                { x: 180, y: 200 },  // East
                { x: 100, y: 250 },  // South
                { x: 130, y: 150 }   // Central
              ];

              return (
                <g key={place.id}>
                  <motion.circle
                    cx={positions[index].x}
                    cy={positions[index].y}
                    r="8"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: 1.5 + index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                  
                  <motion.text
                    x={positions[index].x + 15}
                    y={positions[index].y + 5}
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 + index * 0.2 }}
                  >
                    {place.name.split(' ')[0]}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2.5 },
            y: { duration: 1.5, repeat: Infinity }
          }}
          className="absolute bottom-10 text-white text-center"
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMap;