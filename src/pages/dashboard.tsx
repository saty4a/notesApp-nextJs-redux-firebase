"use client";

import FetchData from "@/hooks/fetchTodo";
import {
  addTodo,
} from "@/redux/todoSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "./todocard";
import { AppDispatch, useAppSelector } from "@/redux/store";

const DashBoard = () => {
  const [text, setText] = useState("");
  const todo = useAppSelector((state: any) => state.todos.todo);
  const dispatch = useDispatch<AppDispatch>();
  type todoVariables = {
    id: any;
    completed: boolean;
    text: String;
  };

  FetchData();

  const addNote = async () => {
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="w-full my-4 text-xs sm:text-sm flex flex-col gap-5 items-center min-[425px]:w-full">
      <div
        className="flex w-full ps-2 justify-center"
        onKeyDown={(e) => {
          e.key === "Enter" ? addNote() : {};
        }}
      >
        <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full ps-2 outline-none text-base sm:text-lg text-slate-900 min-[425px]:w-fit"
        />
        <button
          onClick={addNote}
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
        >
          ADD
        </button>
      </div>
      {todo && todo.length > 0
        ? todo.map((todo: todoVariables) => (
            <TodoCard key={todo.id} todo={todo} />
          ))
        : ""}
    </div>
  );
};

export default DashBoard;
