"use server";

import { db } from "@/lib/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { Record } from "@/type/record";

export const fetchRecords = async () => {
  try {
    const docRef = collection(db, "record");
    const q = query(docRef, orderBy("time"));
    const querySnapshot = await getDocs(q);

    const records: Record[] = [];
    querySnapshot.forEach((doc) => {
      records.push(doc.data() as Record);
    });

    return records;
  } catch {
    return null;
  }
};
