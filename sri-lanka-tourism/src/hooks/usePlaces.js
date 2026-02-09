import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesCollection = collection(db, 'places');
        const placesSnapshot = await getDocs(placesCollection);
        const placesList = placesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlaces(placesList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return { places, loading, error };
};