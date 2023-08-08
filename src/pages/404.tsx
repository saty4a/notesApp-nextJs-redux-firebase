"use client";

import React from "react";
import "../app/globals.css";
function PageNotFound() {
  return (
    <div className="errorPage text-center">
      <p className="font-bold">oops! Page Not Found</p>
      <h1 className="font-bold">404</h1>
      <a
        href="/"
        className="w-fit mx-auto px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
      >
        Go Back
      </a>
    </div>
  );
}

export default PageNotFound;
