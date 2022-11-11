import axios from "axios";
import { BASE_URL } from "../constant";

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type EpisodeInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type EpisodeReponse = {
  info: EpisodeInfo;
  results: Episode[];
};

export const fetchEpisodes = async (episodeUrl?: string) => {
  console.log({ episodeUrl });
  try {
    const { data } = await axios.get<EpisodeReponse>(
      episodeUrl ?? `${BASE_URL}/episode?page=${1}`
    );
    return data;
  } catch (error) {
    console.error("Something went wrong!");
  }
};
