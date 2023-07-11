import Image from "next/image";

const fetchMovies = () => {
  const apiKey = "4f298a53e552283bee957836a529baec";
  const baseUrl = "https://api.themoviedb.org/3/movie/popular";
  return fetch(`${baseUrl}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.results;
    })
    .catch((error) => {
      console.error(error);
    });
};

const formatVoteAverage = (voteAverage: number) => {
  return `${voteAverage * 10}%`;
};

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export async function Popular() {
  const movies: Movie[] = await fetchMovies();

  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4 ml-20">Now Playing</h2>

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
              <h2 className="font-bold">{movie.title}</h2>
            </article>
          ))}
      </div>
    </section>
  );
}
