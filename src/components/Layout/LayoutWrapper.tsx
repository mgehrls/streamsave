import React from "react";
import Footer from "./Footer";
import type { User } from "~/utils/types";
import Header from "./Header";
import SearchBar from "./SearchBar";

export default function LayoutWrapper({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-[#0b0b0b]">
      <Header user={user} />
      <div className="flex justify-center">
        <div className="flex min-h-screen w-full flex-col lg:max-w-5xl">
          <SearchBar />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
