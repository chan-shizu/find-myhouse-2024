"use client";

import { ExplanationModal } from "@/components/explanationModal";
import { GoogleMapArea } from "@/components/GoogleMapArea";
import { useState } from "react";

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

  const updateCurrentStep = (nextStepNumber: number) => {
    setCurrentStep(nextStepNumber);
  };

  return (
    <div className="w-full h-screen">
      <GoogleMapArea />
      {currentStep < explanationContents.length && (
        <ExplanationModal {...explanationContents[currentStep]} updateCurrentStep={updateCurrentStep} />
      )}
    </div>
  );
}
