"use client";

import { auth, googleProvider } from "@/firebase";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/todoSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = async () => {
    try {
      if (!email || !password) {
        setError("Please enter email and Password");
      }
      if (isLoggingIn) {
        await signInWithEmailAndPassword(auth, email, password).then(
          (result) => {
            dispatch(
              login({
                email: result.user.email,
                uid: result.user.uid,
              })
            );
          }
        );
      } else {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (result) => {
            dispatch(
              login({
                email: result.user.email,
                uid: result.user.uid,
              })
            );
          }
        );
      }
    } catch (err) {
      console.log(err);
      setError("Incorrect email or password");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        dispatch(
          login({
            email: result.user.email,
            uid: result.user.uid,
          })
        );
      });
    } catch (error) {
      setError("Account do not exist");
    }
  };

  return (
    <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4">
      <h1 className="font-extrabold select-none text-2xl sm:text-4xl uppercase">
        {isLoggingIn ? "Login" : "register"}
      </h1>
      {error && (
        <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">
          {error}
        </div>
      )}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
      />
      <button
        onClick={() => {
          submitHandler();
        }}
        className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
      >
        <h2 className="relative z-20">SUBMIT</h2>
      </button>
      <button onClick={signInWithGoogle}> Signin with google</button>
      <h2
        className="duration-300 hover:scale-110 cursor-pointer"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {!isLoggingIn ? "Login" : "Register"}
      </h2>
    </div>
  );
};

export default SignIn;
