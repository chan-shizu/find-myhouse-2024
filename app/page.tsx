"use client";

import { ExplanationModal } from "@/components/explanationModal";
import { GoogleMapArea } from "@/components/GoogleMapArea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const explanationContents = [
  {
    imagePath: "/sample1.jpg",
    text: "2年前にフォロワーを激震させたあのゲームが返ってきました！\nこの度引っ越しましたので、僕の家を探していただきます！\n",
    buttonText: "次へ",
    stepNumber: 0,
  },
  {
    imagePath: "/sample2.jpg",
    text: "ルールは簡単、マップ上で僕の家をタッチ出来からクリアです！\nタッチするたびにタッチした個所と僕の家との距離が表示されるので、それをヒントにして見つけてください!",
    buttonText: "次へ",
    stepNumber: 1,
  },
  {
    imagePath: "/sample3.jpg",
    text: "出来るだけ早い時間でクリアしよう！上位者には良いことがあるかも！\n",
    buttonText: "ゲームスタート",
    stepNumber: 2,
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState<Date>();
  const [currentTime, setCurrentTime] = useState<number>();
  const router = useRouter();

  const updateCurrentStep = (nextStepNumber: number) => {
    setCurrentStep(nextStepNumber);
  };

  useEffect(() => {
    if (currentStep !== explanationContents.length) return;
    setStartTime(new Date());
  }, [currentStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startTime) return;
      const now = new Date();
      const diffSecond = now.getTime() - startTime.getTime();
      setCurrentTime(diffSecond / 1000);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const transitToRankingPage = () => {
    if (!currentTime) return;
    localStorage.setItem("clear_time", currentTime.toFixed(1));
    router.push("/ranking");
  };

  return (
    <div className="w-full h-screen">
      <GoogleMapArea transitToRankingPage={transitToRankingPage} />
      {currentStep < explanationContents.length && (
        <ExplanationModal {...explanationContents[currentStep]} updateCurrentStep={updateCurrentStep} />
      )}
      {currentStep === explanationContents.length && (
        <div className="absolute top-0 w-full flex justify-center items-center">
          <div className="w-full h-20 rounded flex justify-center items-center text-3xl bg-gray-500 text-white">
            {currentTime?.toFixed(1)}秒
          </div>
        </div>
      )}
    </div>
  );
}
