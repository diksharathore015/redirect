"use client";
import { AppAssets } from "@/Constants/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CitiesLocation = ({ initialData }: any) => {
  const chunkSize = 20; // Number of cities to load per chunk
  const [visibleData, setVisibleData] = useState(
    initialData.slice(0, chunkSize)
  ); // Initially visible cities
  const [loadedCount, setLoadedCount] = useState(chunkSize); // Number of cities currently loaded
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [showAll, setShowAll] = useState(false); // Flag to show all cities

  // Load more cities when "Show More" button is clicked
  const loadMoreCities = () => {
    setVisibleData((prevData) => [
      ...prevData,
      ...initialData.slice(loadedCount, loadedCount + chunkSize),
    ]);
    setLoadedCount((prevCount) => prevCount + chunkSize);
  };

  // Show all cities when "Show All" button is clicked
  const showAllCities = () => {
    setVisibleData(initialData);
    setShowAll(true);
  };

  // Filter cities based on search query
  const filteredData = initialData.filter((hub) =>
    hub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="md:py-4 mt-20 md:px-6 relative w-full">
        <h2 className="text-2xl md:text-4xl pb-10 font-extrabold text-center font-Montserrat italic capitalize text-blue-800">
          Discover Top Cities Study Hubs
        </h2>

        {/* Search Bar */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by city name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 -lg shadow-md focus:ring-2 focus:ring-blue-800 transition-all duration-300"
          />
        </div>

        {/* City Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-10 gap-3 font-roboto">
          {(searchQuery ? filteredData : visibleData).length > 0 ? (
            (searchQuery ? filteredData : visibleData).map((hub, index) => (
              <div
                key={index}
                className="relative cursor-pointer bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="p-2 flex flex-col justify-between h-full">
                  <h3 className="text-sm font-Montserrat text-center text-white capitalize tracking-wide hover:text-blue-800">
                    {hub.title}
                  </h3>
                  <ol className="space-y-1 px-3 h-0 overflow-hidden group-hover:h-full transition-opacity duration-300">
                    {hub.courses.map((item, i) => (
                      <li key={i}>
                        <div
                          onClick={() =>
                            window.open(`/${item?.slug_field}/${hub.title}`)
                          }
                          className="block bg-white text-sm hover:bg-gray-200 text-blue-800 px-4 py-1 -lg shadow-md transition-all duration-200 hover:shadow-lg"
                        >
                          {item.short_title} in {hub.title}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No cities found</p>
          )}
        </div>

        {/* Show More Button */}

        {/* Show All Button */}
        {!searchQuery && !showAll && (
          <div className="text-center mt-6">
            <button
              onClick={showAllCities}
              className="px-6 py-2 text-white bg-blue-800 -lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Show All Cities
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CitiesLocation;
