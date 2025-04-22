import React, { useState } from "react";

export default function HomepageForm({
  setShowFlyOut,
  coursesData,
  list,
  setList,
}) {
  
  const handleChange = (option: any) => {
    if (list.length >= 1 && list?.includes(option)) {
      setList(list.filter((item) => item != option));
    } else {
      setList([...list, option]);
    }
  };
  return (
    <div className="max-w-md w-full  md:my-0 my-10 md:border-0 border-2  px-2 md:px-12 bg-white shadow-lg rounded-lg md:p-8 py-8 transition-transform transform hover:md:scale-105">
      <span className="text-xl md:text-3xl lg:text-4xl font-bold text-center text-primary animate-pulse">
        Sainik School, Military School, and RIMC Entrance Exam Coaching Centre
      </span>

      <p className="text-center text-gray-600 mt-4">
        For which entrance exam are you preparing?
      </p>

      <div className="mt-6 space-y-4  md:px-5">
        {coursesData.map((option, index) => (
          <div
            key={index}
            className="border border-gray-400 md:p-4  p-2 rounded-lg cursor-pointer hover:bg-gray-100 transform transition duration-200 hover:scale-105"
          >
            <label className="flex items-center space-x-3 px-3">
              <input
                type="checkbox"
                name="coaching"
                value={option.id}
                onChange={(e: any) => handleChange(e.target.value)}
                className="form-checkbox text-primary focus:ring-gray-500"
              />
              <span className="text-gray-700 md:text-base text-xs capitalize">
                {option?.title}
              </span>
            </label>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => {
            setShowFlyOut(true);

            // console.log(list);
          }}
          className="bg-primary  text-white md:text-base text-sm py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-110 hover:bg-gray-900"
        >
          GET START
        </button>
      </div>
    </div>
  );
}
