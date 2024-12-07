import { FC } from "react";

type Props = { text: string; onClick: () => void };

export const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <button className="w-full h-14 bg-red-500 rounded-full" type="button" onClick={onClick}>
      {text}
    </button>
  );
};
