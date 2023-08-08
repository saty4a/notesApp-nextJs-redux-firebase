import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export const postData = async (userId: any, length: any, data: any) => {
  const userRef = doc(db, "users", userId);
  await setDoc(
    userRef,
    {
      todos: {
        [length]: data,
      },
    },
    { merge: true }
  );
};
