"use client";

import { deleteData, deleteTodos } from "@/apiCalls/deleteTodo";
import { postData } from "@/apiCalls/postTodo";
import { createSlice } from "@reduxjs/toolkit";

export type NotesState = {
  todo: any;
  user: String | any;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    user: "",
    todo: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
    },
    addTodo: (state: NotesState, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todo.push(newTodo);
      postData(state.user.uid, state.todo.length, newTodo);
    },
    updateTodo: (state: NotesState, action) => {
      const note = state.todo.find(
        (todo: { id: any }) => todo.id === action.payload.id
      );
      if (note && action.payload.data === "") {
        note.completed = !note.completed;
      }
      if (note && action.payload.data !== "") {
        note.text = action.payload.data;
      }
      postData(state.user.uid, state.todo.length, note);
    },
    deleteTodo: (state: NotesState, action) => {
      const index = state.todo.findIndex(
        (todo: { id: string }) => todo.id === action.payload
      );
      if (index !== -1) {
        state.todo.splice(index, 1);
        deleteData(state.user.uid, index);
      }
      if (state.todo.length <= 0) {
        state.todo = [];
        deleteTodos(state.user.uid);
      }
    },
    getTodos: (state: NotesState, action) => {
      state.todo.push(action.payload);
    },
  },
});

export const { login, logout, addTodo, updateTodo, deleteTodo, getTodos } =
  todoSlice.actions;
export const selectUser = (state: String | any) => state;
export default todoSlice.reducer;
