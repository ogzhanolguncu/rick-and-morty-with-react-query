import axios from "axios";
import { BASE_URL } from "../constant";

export type EpisodeResponse = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export const fetchEpisodes = async (episode: string) => {
  try {
    const { data } = await axios.get<EpisodeResponse>(episode);
    return data;
  } catch (error) {
    console.error("Something went wrong!");
  }
};
