"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons for dropdown
import RawHtmlRenderer from "../UI/RawHtmlRendererProps";

const FAQ = ({ faqsData, locationdatas = "india" }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close answer
  };

  return (
    <div className=" md:w-[95%]  mx-auto py-12 px-6">
      <h2 className="text-2xl md:text-4xl  pb-10 font-extrabold text-center font-Montserrat italic capitalize   text-blue-800">
        Frequently Asked Questions
      </h2>
      <div className="  ">
        {faqsData.map(
          (faq: { question: string; answer: string }, index: number) => (
            <div
              onClick={() => toggleAnswer(index)}
              key={index}
              className="border-b py-8  hover:bg-gray-100 hover:cursor-pointer  rounded-md px-2"
            >
              <div
                className="flex  justify-between w-full text-left text-xl font-semibold text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={() => toggleAnswer(index)}
              >
                <RawHtmlRenderer
                  htmlContent={faq.question}
                  currentLocation={
                    locationdatas?.type == "none"
                      ? locationdatas?.matchedItem
                      : locationdatas?.matchedItem?.title || "india"
                  }
                />

                <span>
                  {openIndex === index ? (
                    <FaChevronUp className="text-gray-600" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </span>
              </div>
              <div
                className={`transition-all duration-800 ease-linear mt-2 text-gray-600 ${
                  openIndex === index
                    ? "max-h-screen"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                <RawHtmlRenderer
                  htmlContent={faq.answer}
                  currentLocation={
                    locationdatas?.type == "none"
                      ? locationdatas?.matchedItem
                      : locationdatas?.matchedItem?.title || "india"
                  }
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FAQ;
