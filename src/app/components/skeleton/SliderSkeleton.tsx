import React from "react";

export default function SliderSkeleton() {
  return (
    <>
      {" "}
      <div className="hidden md:flex md:flex-wrap md:justify-between md:mx-auto md:px-9  w-full md:w-[98%]  py-5  ">
        {[1, 2, 3, 4, 5, 6].map((item: any, i: any) => (
          <div key={i} className="flex flex-col gap-1 ">
            <div className="relative w-full h-28  md:w-64 mb-1 md:h-64 mx-1 rounded-lg bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient  "></div>
          </div>
        ))}
      </div>
      <div className="md:hidden block gap-1 ">
        <div className="relative w-full h-96  md:w-64 md:h-64 mx-1 rounded-lg bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient  "></div>
      </div>
    </>
  );
}
