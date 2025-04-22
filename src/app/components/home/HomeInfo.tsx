"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TitleBoxSkeleton from "../skeleton/TitleBoxSkeleton";

const HomeInfo = ({ seoData }: any) => {
  const [data, setData] = useState<any>(seoData);
  const router = useRouter();

  return (
    <div className="bg-white mt-10 md:mt-20 ">
      <div className="  mx-auto 4">
        {/* Header Section */}
        <div className="bg-white    ">
          <h1 className="text-xl md:text-4xl font-extrabold text-center font-Montserrat italic capitalize   text-blue-800">
            {data?.title}
          </h1>
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Description Section */}
          <p className="text-gray-600 md:text-sm  md:text-left text-center text-sm leading-relaxed ">
            {data?.description}
          </p>

          {/* Call-to-Action Section */}
          <div className="md:mt-8  mt-3 md:text-center flex items-center justify-center ">
            <button
              onClick={() => router.push("/course")}
              className="bg-blue-800 hover:bg-gray-700 text-white text-sm font-semibold md:py-3 md:px-6 px-2 py-1  transition-transform transform hover:scale-105"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
