export interface Movies {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface Props {
  params: {
    id: string;
  };
  id: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres: Genre[];
  overview: string;
  backdrop_path: string;
  tagline: string;

  homepage: string;
}
export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: null | string;
  character?: string;
}
