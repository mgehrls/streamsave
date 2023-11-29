import { api } from "~/utils/api";

export default function SearchResults({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const { data } = api.mDB.search.useQuery({ query: searchQuery });
  if (data) {
    console.log(data);
  }

  return (
    <div>
      {data?.map((movie, i) => (
        <div className="flex w-1/2 flex-col gap-2" key={movie.id}>
          <h2 className="text-3xl">
            <span>{`${i}.`}</span>
            {movie.title || movie.name}
          </h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}
