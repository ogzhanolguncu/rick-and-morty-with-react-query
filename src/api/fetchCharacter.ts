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

export const fetchCharacter = async (charUrl: string) => {
  try {
    const { data } = await axios.get<Character>(charUrl);
    return data;
  } catch (error) {
    console.error("Something went wrong!");
  }
};
