"use client";

import { auth } from "@/firebase";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/todoSlice";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

type modalProperties = {
  setOpenModal: Function;
};

const Modal = (props: modalProperties) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useAppSelector((state: any) => state.todos.user);

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded bg-white p-3 z-50 lg:flex flex-col w-[15rem] h-[10rem] fixed top-[4rem] end-10 border shadow-[0px_2px_50px_rgba(0,0,0,0.25)] text-black">
      <div className="flex items-center justify-between border-b border-solid border-slate-900">
        <h1 className="text-2xl sm:text-2xl select-none">MENU</h1>
      </div>
      <div className="">
        <p className="border-b border-solid border-slate-900 py-3 overflow-auto">
          {userId?.email}
        </p>
        <h2
          onClick={() => {
            logOut();
            props.setOpenModal(false);
          }}
          className="select-none duration-300 hover:pl-2 cursor-pointer py-3"
        >
          Logout
        </h2>
      </div>
    </div>
  );
};

export default Modal;
