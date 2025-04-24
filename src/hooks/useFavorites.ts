import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Character } from "../types";

const FAVORITES_KEY = "harryPotterFavorites";
const QUERY_KEY = "favorites";

// Helper functions to interact with localStorage
const getFavoritesFromStorage = (): Character[] => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Error parsing favorites from localStorage:", error);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Character[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const useFavorites = () => {
  const queryClient = useQueryClient();

  // Query to get favorites
  const { data: favorites = [] } = useQuery<Character[]>({
    queryKey: [QUERY_KEY],
    queryFn: getFavoritesFromStorage,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Check if a character is a favorite
  const isFavorite = (id: string): boolean => {
    return favorites.some((character: Character) => character.id === id);
  };

  // Add a character to favorites
  const addFavorite = (character: Character) => {
    if (!isFavorite(character.id)) {
      const newFavorites = [...favorites, character];
      saveFavoritesToStorage(newFavorites);
      queryClient.setQueryData<Character[]>([QUERY_KEY], newFavorites);
    }
  };

  // Remove a character from favorites
  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(
      (character: Character) => character.id !== id
    );
    saveFavoritesToStorage(newFavorites);
    queryClient.setQueryData<Character[]>([QUERY_KEY], newFavorites);
  };

  // Toggle a character's favorite status
  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
