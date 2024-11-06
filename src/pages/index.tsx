import Head from "next/head";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import Home from "~/components/Home/Home";

export default function Root() {
  return (
    <div className="min-w-screen bg-darkBackground flex flex-col items-center justify-center text-slate-50">
      <Head>
        <title>StreamSave</title>
        <meta
          name="description"
          content="Log in to make a list of your favorite shows and movies sorted and filtered however you want."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  );
}
