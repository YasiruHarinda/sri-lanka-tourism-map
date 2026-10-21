import { useState } from 'react';
import { FaCity, FaLandmark, FaMountain, FaPaw, FaUmbrellaBeach } from 'react-icons/fa';
import { CATEGORIES } from '../data/places';

const CATEGORY_ICONS = {
  heritage: FaLandmark,
  beach: FaUmbrellaBeach,
  wildlife: FaPaw,
  hills: FaMountain,
  city: FaCity,
};

// Photo with a coloured, iconed placeholder if the image can't be loaded.
const PlaceImage = ({ place, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const Icon = CATEGORY_ICONS[place.category] ?? FaLandmark;
  const color = CATEGORIES[place.category]?.color ?? '#0f5e59';

  if (failed || !place.image) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ background: `linear-gradient(135deg, ${color}, #0a3f3c)` }}
        role="img"
        aria-label={place.name}
      >
        <Icon className="text-5xl text-white/70" />
      </div>
    );
  }

  return (
    <img
      src={place.image}
      alt={place.name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};

export default PlaceImage;
