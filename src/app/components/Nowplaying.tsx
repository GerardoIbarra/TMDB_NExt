import Image from "next/image";
import Link from "next/link";
import { Genre, Movies, Props } from "./../interfaces/InterfaceMovie";

const fetchMovies = (movie: string) => {
  const apiKey = "4f298a53e552283bee957836a529baec";
  const baseUrl = `https://api.themoviedb.org/3/movie/${movie}`;
  return fetch(`${baseUrl}?api_key=${apiKey}`, {
    next: {
      revalidate: 600,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchGenders = () => {
  const apiKey = "4f298a53e552283bee957836a529baec";
  const baseUrl = "https://api.themoviedb.org/3/genre/movie/list";
  return fetch(`${baseUrl}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      return data.genres;
    })
    .catch((error) => {
      console.error(error);
    });
};
const formatVoteAverage = (voteAverage: number) => {
  return `${voteAverage * 10}%`;
};
export async function NowPlaying({ id }: Props) {
  const movies: Movies[] = await fetchMovies(id);
  const genders: Genre[] = await fetchGenders();

  const getGenreName = (genreId: number): string => {
    const genre = genders.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 ml-20 mt-3">
        {id === "now_playing"
          ? "Now Playing"
          : id === "upcoming"
          ? " Upcoming"
          : id === "popular"
          ? "Popular"
          : "Top rated"}
      </h2>
      <div className="flex overflow-x-auto">
        {movies &&
          movies.map((movie) => (
            <article key={movie.id} className="flex-shrink-0 w-64 p-4">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-full h-auto"
                width={200}
                height={200}
                alt={movie.title}
                priority
              />
              <div className="flex items-center">
                <p className="text-sm text-white bg-sky-950 rounded-full px-2 py-1 w-10 h-10 flex items-center justify-center relative">
                  {formatVoteAverage(movie.vote_average)}
                </p>
                <h3 className="italic text-sm ml-2">{movie.release_date}</h3>
              </div>
              <Link href={"/[id]"} as={`/${movie.id}`}>
                <h2 className="font-bold">{movie.title}</h2>
              </Link>
              <div className="mt-2">
                {movie.genre_ids.length > 0 &&
                  movie.genre_ids.map((genreId) => (
                    <span
                      key={genreId}
                      className="text-sm bg-gray-200 text-gray-800 rounded-full px-2 py-1 mr-2"
                    >
                      {getGenreName(genreId)}
                    </span>
                  ))}
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
