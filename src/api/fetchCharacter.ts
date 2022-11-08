import axios from "axios";
import { BASE_URL } from "../constant";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export const fetchCharacter = async () => {
  try {
    const { data } = await axios.get<CharacterResponse>(
      `${BASE_URL}/character`
    );
    return data;
  } catch (error) {
    console.error("Something went wrong!");
  }
};
