import { api } from "~/utils/api";
import Loading from "../Loading";
import MediaRow from "../MediaRow";
import LayoutWrapper from "../Layout/LayoutWrapper";

function Feed () {
    const { data: apiData, isLoading: trendingLoading, isError: trendingError } = api.mDB.getTrending.useQuery();

    console.log('feed ran')
    if (trendingError)
        return <div>Error contacting api for trending data</div>;
    if (trendingLoading)
        return (
            <div className="flex min-h-[20rem] w-full items-center justify-center">
                <Loading />
             </div>
      );
    const { trendingShows, popularShows, popularMovies } = apiData;
    return (
        <>
            <MediaRow title={"Trending Shows"} media={trendingShows} bgColor="bg-zinc-500"/>
            <MediaRow title={"Popular Shows"} media={popularShows} bgColor="bg-zinc-600"/>
            <MediaRow title={"Popular Movies"} media={popularMovies} bgColor="bg-zinc-700"/>
        </>
    );
}

export default Feed;