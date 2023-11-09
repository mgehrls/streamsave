import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const outfit = Outfit({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className={outfit.className}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
