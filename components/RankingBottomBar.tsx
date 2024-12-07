"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./Button";

type Props = {};

export const RankingBottomBar: FC<Props> = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 w-full px-6 h-24 flex flex-col justify-center bg-white opacity-80">
      <Button onClick={() => router.push("/")} text="リトライ!" />
    </div>
  );
};
