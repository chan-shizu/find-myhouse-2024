"use client";

import { AddRecord } from "@/components/AddRecord";
import { ClearVideo } from "@/components/ClearVideo";
import { RankingBottomBar } from "@/components/RankingBottomBar";
import { RankingDescription } from "@/components/RankingDescription";
import { RecordList } from "@/components/RecordList";
import { useState } from "react";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const updateCurrentStep = (nextStepNumber: number) => {
    setCurrentStep(nextStepNumber);
  };

  return (
    <div className="">
      {currentStep === 0 && <ClearVideo updateCurrentStep={updateCurrentStep} />}
      {currentStep === 1 && <AddRecord updateCurrentStep={updateCurrentStep} />}

      <RankingDescription />
      <div className="mt-6">
        <RecordList currentStep={currentStep} />
      </div>
      <RankingBottomBar />
    </div>
  );
}
