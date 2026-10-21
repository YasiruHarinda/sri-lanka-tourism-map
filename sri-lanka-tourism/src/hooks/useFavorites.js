import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sl-tourism:favorites';

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage can be unavailable (private mode); favourites just won't persist.
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]));
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};
