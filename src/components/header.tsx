"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "./modal";
import { useAppSelector } from "@/redux/store";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const userId = useAppSelector((state: any) => state.todos.user);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="sticky top-0 w-full left-0 z-40 flex items-center justify-between p-4 border-b border-solid border-white blur-background">
        <h1 className="text-3xl select-none sm:text-6xl">TODO LIST</h1>
        {userId === null ? (
          <></>
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => setOpenModal(!openModal)}
            className="fa-solid fas fa-user text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"
          ></FontAwesomeIcon>
        )}
      </div>
    </>
  );
}
