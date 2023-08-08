import { db } from "@/firebase";
import { deleteDoc, deleteField, doc, setDoc } from "firebase/firestore";

export const deleteData = async (userId: any, data: any) => {
  const userRef = doc(db, "users", userId);
  await setDoc(
    userRef,
    {
      todos: {
        [data + 1]: deleteField(),
      },
    },
    { merge: true }
  );
};

export const deleteTodos = async (userId: any) => {
  try {
    const todoRef = doc(db, "users", userId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
