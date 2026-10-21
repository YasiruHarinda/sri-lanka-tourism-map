import { useState, useEffect } from 'react';
import { places as localPlaces, CATEGORIES } from '../data/places';

const useFirestore = import.meta.env.VITE_USE_FIRESTORE === 'true';

// Firestore docs may use the older field names (latitude/longitude, fullDescription).
const normalize = (doc) => {
  const data = doc.data();
  const category = String(data.category ?? '').toLowerCase();
  return {
    highlights: [],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    ...data,
    id: doc.id,
    category: CATEGORIES[category] ? category : 'heritage',
    lat: Number(data.lat ?? data.latitude),
    lng: Number(data.lng ?? data.longitude),
    description: data.description ?? data.fullDescription ?? '',
  };
};

/**
 * Returns the bundled places straight away. When VITE_USE_FIRESTORE=true it also
 * fetches the "places" collection and swaps it in if it has any documents.
 */
export const usePlaces = () => {
  const [places, setPlaces] = useState(localPlaces);
  const [source, setSource] = useState('local');

  useEffect(() => {
    if (!useFirestore) return;
    let cancelled = false;

    (async () => {
      try {
        const [{ collection, getDocs }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('../config/firebase'),
        ]);
        const snapshot = await getDocs(collection(db, 'places'));
        const remote = snapshot.docs.map(normalize).filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
        if (!cancelled && remote.length > 0) {
          setPlaces(remote);
          setSource('firestore');
        }
      } catch (err) {
        console.warn('Could not load places from Firestore, using bundled data instead.', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { places, source };
};
