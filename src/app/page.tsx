"use client";

import Header from "@/components/header";
import MainPage from "@/pages/mainpage";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function Home() {
  return (
        <div className="flex flex-col min-h-screen relative bg-slate-900 text-white">
        <Header />
          <MainPage />
      </div>
  );
}
