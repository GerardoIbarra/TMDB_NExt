import Image from "next/image";
import Link from "next/link";
import { Cast, Props, Movie } from "./../interfaces/InterfaceMovie";

const fetchMovie = (id: string) => {
  const apiKey = "4f298a53e552283bee957836a529baec";
  const baseUrl = `https://api.themoviedb.org/3/movie/${id}`;
  return fetch(`${baseUrl}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
const fetchMovieCreidts = (id: string) => {
  const apiKey = "4f298a53e552283bee957836a529baec";
  const baseUrl = `https://api.themoviedb.org/3/movie/${id}/credits`;
  return fetch(`${baseUrl}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      return data.cast;
    })
    .catch((error) => {
      console.error(error);
    });
};

const formatVoteAverage = (voteAverage: number) => {
  return `${voteAverage * 10}%`;
};

export default async function Movie({ params }: Props) {
  const { id } = params;

  const movie: Movie = await fetchMovie(id);
  const movieCredits: Cast[] = await fetchMovieCreidts(id);

  return (
    <div className="flex flex-row-reverse">
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="flex mb-2">
          {movie.genres.map((genders) => (
            <p key={genders.id} className="text-gray-500 mr-2">
              {genders.name}
            </p>
          ))}
        </div>
        <div className="flex items-center">
          <p className="text-sm text-white bg-sky-950 rounded-full px-1 py-1 w-12 h-12 flex items-center justify-center relative">
            {formatVoteAverage(movie.vote_average)}
          </p>
          <h3 className="italic text-sm ml-2">{movie.release_date}</h3>
        </div>
        <div className="mt-7">
          <p className="text-gray-500 mb-6">"{movie.tagline}"</p>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 mb-6">{movie.overview}</p>
          <Link href={`${movie.homepage}`}>
            <p>{movie.homepage}</p>
          </Link>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4 ml-20">Top Billed Cast</h2>

          <div className="flex overflow-x-auto">
            {movieCredits &&
              movieCredits.slice(0, 15).map((cast) => (
                <article key={cast.id} className="flex-shrink-0 w-64 p-4">
                  {cast.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      alt={cast.character ? cast.character : "Cast undefined"}
                      className="w-full h-auto"
                      width={200}
                      height={200}
                      priority
                    />
                  ) : (
                    <div className="w-full h-auto bg-gray-300"></div>
                  )}
                  <h2 className="font-bold">{cast.name}</h2>
                  <p>{cast.character}</p>
                </article>
              ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 p-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="Imagen de la película"
          className="w-auto h-auto mx-auto"
          width={600}
          height={800}
        />
      </div>
    </div>
  );
}
