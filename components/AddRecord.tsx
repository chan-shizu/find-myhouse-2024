"use client";

import { FC } from "react";
import { Button } from "./Button";
import { insertRecord } from "@/app/ranking/actions/insertRecord";

type Props = { updateCurrentStep: (nextStepNumber: number) => void };

export const AddRecord: FC<Props> = ({ updateCurrentStep }) => {
  const onSubmit = async () => {
    const form = document.getElementById("form") as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const clearTime = localStorage.getItem("clear_time");
    if (!name || !clearTime) return;
    await insertRecord(name, clearTime);
    localStorage.setItem("complete", "true");
    updateCurrentStep(2);
  };

  return (
    <div className="w-full fixed top-0 h-screen bg-white bg-opacity-80 flex flex-col justify-center z-10 p-4">
      <div className=" px-4 py-10 border border-gray-400 rounded bg-white">
        <p>ランキングに表示するためのニックネーム(誰だかわかる名前だとうれしいな..!)を入力してください！</p>
        <form id="form" className="w-full mt-12 flex flex-col gap-y-4">
          <input
            required
            name="name"
            className="border border-gray-400 h-14 rounded w-full px-2"
            placeholder="こうちゃん"
          />
          <div className="w-60 mx-auto">
            <Button text="送信" onClick={onSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};
