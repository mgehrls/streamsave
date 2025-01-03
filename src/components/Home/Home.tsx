import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import LayoutWrapper from "../Layout/LayoutWrapper";
import Loading from "../Loading";
import BottomSection from "./Bottom";
import MiddleSection from "./Middle";
import TopSection from "./Top";
import Feed from "../Feed/Feed";

function Home() {
  const user = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  if (!user.isLoaded) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-slate-50">
        <Loading />
      </div>
    );
  } else if (user.isSignedIn) {
    return (
      <LayoutWrapper user={user}>
        <Feed />
      </LayoutWrapper>
    );
  } else {
    return (
      <div className="flex h-auto w-full justify-center">
        <div className="w-full flex-col lg:max-w-7xl">
          <TopSection />
          <MiddleSection />
          <BottomSection />
        </div>
      </div>
    );
  }
}

export default Home;
