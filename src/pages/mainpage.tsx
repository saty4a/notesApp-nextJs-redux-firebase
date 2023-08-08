"use client";

import React from "react";
import DashBoard from "./dashboard";
import SignIn from "./signin";
import { useAppSelector } from "@/redux/store";

const MainPage = () => {
  const storeData = useAppSelector((selectUser) => selectUser.todos.user);
    return (
      <>
        {!storeData && <SignIn />}
        {storeData && <DashBoard />}
      </>
    );
};

export default MainPage;
