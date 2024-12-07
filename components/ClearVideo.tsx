"use client";

import { FC, useRef } from "react";

type Props = { updateCurrentStep: (nextStepNumber: number) => void };

export const ClearVideo: FC<Props> = ({ updateCurrentStep }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const StartReplay = () => {
    if (videoRef.current?.currentTime) {
      videoRef.current.currentTime = 0;
    }
    videoRef.current?.play();
  };

  const onEnded = () => {
    const completeFlag = localStorage.getItem("complete");
    if (completeFlag) {
      updateCurrentStep(2);
    } else {
      updateCurrentStep(1);
    }
  };

  return (
    <div
      onClick={StartReplay}
      className="w-full fixed top-0 h-screen bg-white bg-opacity-80 z-10 flex flex-col justify-center p-4"
    >
      <div className="my-auto flex flex-col justify-center gap-y-2 items-center bg-white px-4 py-10 border border-gray-400 rounded">
        <div>
          <p className="text-sm">画面をクリックしたら動画が再生されます👍</p>
          <p className="text-sm">動画が最後まで流れたら次の画面に行きます👊</p>
        </div>
        <video src="clear_omedetou.mp4" ref={videoRef} className="" onEnded={onEnded} autoPlay playsInline />
      </div>
    </div>
  );
};
