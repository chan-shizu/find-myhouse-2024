import { FC } from "react";
import Image from "next/image";

export const RankingDescription: FC = () => {
  return (
    <div className="flex flex-col items-center border-b border-dashed border-b-yellow-400 pb-4">
      <Image className="mx-auto mt-4" src="/crown.svg" alt="王冠の画像" width={70} height={70} />
      <h1 className="text-3xl ">ランキング</h1>
      <p className="text-xs mt-2">ランキングに記録が追加されるのは初回の挑戦だけです🙇</p>
    </div>
  );
};
