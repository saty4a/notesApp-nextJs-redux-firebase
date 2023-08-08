"use client";

import { db } from "@/firebase";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getTodos } from "@/redux/todoSlice";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const FetchData = () => {
  const userId = useAppSelector((state: any) => state.todos.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function getData() {
      try {
        const docRef = doc(db, "users", userId.uid);
        await getDoc(docRef).then((res) => {
          if (res.exists()) {
            for (let i in res.data().todos) {
              dispatch(getTodos(res.data().todos[i]));
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return {};
};

export default FetchData;
