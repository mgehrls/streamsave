import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SearchResults from "../SearchResults";
import React from "react";
import Footer from "./Footer";
import { User } from "~/utils/types";
import Header from "./Header";

export default function LayoutWrapper({
  user,
  children,
}: {user: User, children: React.ReactNode}) {

  return (
    <div className="relative min-h-screen w-full bg-zinc-800 text-slate-50">
      <div className="flex min-h-screen w-full items-start justify-center">
        <div className="flex min-h-screen w-full max-w-5xl flex-col justify-between">
          <Header user={user} />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
