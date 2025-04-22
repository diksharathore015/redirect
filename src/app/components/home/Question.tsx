/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";

import { useRouter } from "next/navigation";

interface QuestionProps {
  ShowWriteQuestion?: boolean;
  setShowWriteQuestion?: (show: boolean) => void;
  data?: any;
}

const Question: React.FC<QuestionProps> = ({
  ShowWriteQuestion,
  setShowWriteQuestion,
  data,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/engagement/");
  };

  return (
    <div className="py-12 px-5 flex flex-col w-full justify-center items-center gap-2">
      <p className="text-description">HANDCRAFT WITH INTEGRITY</p>
      <p className="text-4xl text-heading">Have a Question</p>
      <p className="text-sm text-description text-center">
        Got Questions? We're Here to Help!
      </p>

      <button
        onClick={() => handleButtonClick()}
        className="font-lato rounded-[3px] px-8 py-2.5 flex items-center justify-center border hover:text-white text-gray-500 hover:bg-gray-700    transition-transform duration-300 ease-in-out transform "
      >
        Write a message
      </button>
    </div>
  );
};

export default Question;
