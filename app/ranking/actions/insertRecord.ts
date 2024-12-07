"use server";

import { db } from "@/lib/firestore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const insertRecord = async (name: string, time: string) => {
  try {
    const collectionRef = collection(db, "record");
    await addDoc(collectionRef, { name, time });
    return { result: "ok" };
  } catch {
    return null;
  }
};
