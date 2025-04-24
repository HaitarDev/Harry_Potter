import { useQuery } from "@tanstack/react-query";
import { Character, Spell } from "../types";

const API_BASE_URL = "https://hp-api.onrender.com/api";

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
      const response = await fetch(`${API_BASE_URL}/character/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const characters = await response.json();
      return characters[0]; // API returns an array with a single character
    },
    enabled: !!id,
  });
};

// Fetch Hogwarts students
export const useHogwartsStudents = () => {
  return useQuery<Character[]>({
    queryKey: ["hogwartsStudents"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/characters/students`);
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
      const response = await fetch(`${API_BASE_URL}/characters/staff`);
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
