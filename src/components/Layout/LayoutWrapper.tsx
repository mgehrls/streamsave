import React from "react";
import Footer from "./Footer";
import type { User } from "~/utils/types";
import Header from "./Header";

export default function LayoutWrapper({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-darkBackground flex min-h-screen w-full flex-col justify-between">
      <div>
        <Header user={user} />
        <div className="flex h-auto justify-center">
          <div className="flex w-full flex-col lg:max-w-5xl">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
