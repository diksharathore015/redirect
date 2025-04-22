import React from "react";

export default function TitleBoxSkeleton() {
  return (
    <div className=" mt-5  md:py-10 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient">
      <div className="  mx-auto md:px-4 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient shadow-lg rounded-lg md:p-8 p-4 ">
          <p className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient text-xl md:text-4xl font-extrabold text-gray-800 md:text-center mb-6"></p>
          <div className=" bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient border-t border-gray-300 mb-6"></div>

          {/* Description Section */}
          <p className="text-gray-600 md:text-lg text-sm leading-relaxed bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient "></p>

          {/* Call-to-Action Section */}
          <div className="md:mt-8  mt-3 md:text-center bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient">
            <button className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-gradient-size animate-gradient font-semibold md:py-3 md:px-6 px-14 w-28 h-12 py-1 rounded-lg shadow-md transition-transform transform hover:scale-105"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
