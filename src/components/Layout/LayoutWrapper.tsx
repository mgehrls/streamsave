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
    <div className="w-full bg-gray-800">
      <Header user={user} />
      <div className="flex justify-center">
        <div className="max-w-5xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
