import React from "react";
import SliderSkeleton from "./SliderSkeleton";
import ParagraphSkeleton from "./ParagraphSkeleton";
import LineSkeleton from "./LineSkeleton";
import HeadingSkeleton from "./HeadingSkeleton";

export default function Comman() {
  return (
    <div className="">
      <HeadingSkeleton />
      <div className=" rounded-md h-4 md:h-12 md:my-3  md:mt-3    mx-auto w-[95%] bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient "></div>
      <SliderSkeleton />
      {/* <div className=" flex flex-wrap justify-between mx-auto md:px-9   md:w-[98%]  py-5  ">
      {[1, 2].map((item: any, i: any) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="relative w-44 h-44 mx-1 rounded-lg bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient  "></div>
          <p className="relative w-[95%] mx-auto rounded-md h-6  my-2  bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient  "></p>
        </div>
      ))}
    </div> */}
      <ParagraphSkeleton />
      <ParagraphSkeleton />
      <HeadingSkeleton />
      <LineSkeleton />
      <ParagraphSkeleton />
      <SliderSkeleton />
    </div>
  );
}
