import { FC } from "react";

type Props = { text: string; onClick: () => void; isButtonActive?: boolean };

export const Button: FC<Props> = ({ text, onClick, isButtonActive = true }) => {
  return (
    <button
      disabled={!isButtonActive}
      className={`w-full h-14 rounded-full ${isButtonActive ? "bg-red-500" : "bg-gray-300"}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
