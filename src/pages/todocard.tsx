"use client";

import { AppDispatch } from "@/redux/store";
import { deleteTodo, updateTodo } from "@/redux/todoSlice";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type propsTypes = {
  todo: any;
};

const TodoCard = (props: propsTypes) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(props?.todo?.text? props.todo.text : "");
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTodo = (id: { id: Number }) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id: { id: Number }) => {
    const updateNote = {
      id: id,
      data: text,
    };
    dispatch(updateTodo(updateNote));
  };

  const updateText = (id: { id: Number }) => {
    handleUpdateTodo(id);
    setEdit(false);
  };

  return (
    <div className="p-2 ms-2 relative z-10 sm:p-3 border flex items-stretch border-white border-solid min-[425px]:w-[15rem] min-[550px]:w-1/2">
      <div className="flex-1 flex overflow-auto mx-3">
        {edit ? (
          <input
            className="bg-inherit flex-1 text-white outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <p
            style={{
              textDecoration: props.todo.completed ? "line-through" : "none",
            }}
          >
            {props.todo.text}{" "}
          </p>
        )}
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            handleUpdateTodo(props.todo.id), setText("");
          }}
        >
          {props.todo.completed ? "Mark Incomplete" : "Mark Complete"}{" "}
        </button>
        {edit ? (
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => {
              updateText(props.todo.id);
            }}
            className="fa-solid fas fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => setEdit(true)}
            className="fa-solid fas fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
          ></FontAwesomeIcon>
        )}
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            handleDeleteTodo(props.todo.id);
          }}
          className="fa-solid fas fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default TodoCard;
