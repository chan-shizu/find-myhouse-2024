import { FC } from "react";
import Image from "next/image";
import { Button } from "./Button";

type Props = {
  imagePath?: string;
  text: string;
  buttonText: string;
  stepNumber: number;
  updateCurrentStep: (nextCurrentStepNumber: number) => void;
};

export const ExplanationModal: FC<Props> = ({ imagePath, text, buttonText, stepNumber, updateCurrentStep }) => {
  return (
    <div className="p-5 fixed top-0 w-full h-screen bg-white bg-opacity-60">
      <div className="bg-white h-full overflow-auto relative">
        {imagePath && (
          <div className="w-full h-60 relative border-b-2">
            <Image src={imagePath} alt="画面の画像など" fill className="object-cover" />
          </div>
        )}
        <div className="p-3">
          <div className="whitespace-break-spaces">{text}</div>
          <div className="absolute bottom-[88px] w-[calc(100%_-_24px)] flex justify-center gap-x-3 ">
            <div className={`w-3 h-3 rounded-full ${stepNumber === 0 ? "bg-black" : "bg-gray-200"}`}></div>
            <div className={`w-3 h-3 rounded-full ${stepNumber === 1 ? "bg-black" : "bg-gray-200"}`}></div>
            <div className={`w-3 h-3 rounded-full ${stepNumber === 2 ? "bg-black" : "bg-gray-200"}`}></div>
          </div>
          <div className="absolute bottom-4 w-[calc(100%_-_24px)]">
            <Button onClick={() => updateCurrentStep(stepNumber + 1)} text={buttonText} />
          </div>
        </div>
      </div>
    </div>
  );
};
