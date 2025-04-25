import { useQuery } from "@tanstack/react-query";
import { Character, Spell } from "../types";

// Update API base URL to point to our backend
const API_BASE_URL = "https://harry-potter-backend-1-y2s8.onrender.com/api";

// Fetch all characters
export const useCharacters = () => {
  return useQuery<Character[]>({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/characters`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      return response.json();
    },
  });
};

// Fetch a single character by ID
export const useCharacter = (id: string) => {
  return useQuery<Character>({
    queryKey: ["character", id],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/characters/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      return response.json(); // Backend now returns the character directly, not an array
    },
    enabled: !!id,
  });
};

// Fetch Hogwarts students
export const useHogwartsStudents = () => {
  return useQuery<Character[]>({
    queryKey: ["hogwartsStudents"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/characters/hogwarts/students`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Hogwarts students");
      }
      return response.json();
    },
  });
};

// Fetch Hogwarts staff
export const useHogwartsStaff = () => {
  return useQuery<Character[]>({
    queryKey: ["hogwartsStaff"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/characters/hogwarts/staff`);
      if (!response.ok) {
        throw new Error("Failed to fetch Hogwarts staff");
      }
      return response.json();
    },
  });
};

// Fetch characters by house
export const useHouseMembers = (house: string) => {
  return useQuery<Character[]>({
    queryKey: ["house", house],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/characters/house/${house}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${house} members`);
      }
      return response.json();
    },
    enabled: !!house,
  });
};

// Fetch all spells
export const useSpells = () => {
  return useQuery<Spell[]>({
    queryKey: ["spells"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/spells`);
      if (!response.ok) {
        throw new Error("Failed to fetch spells");
      }
      return response.json();
    },
  });
};
