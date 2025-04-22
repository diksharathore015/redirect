"use client";
import { AppAssets } from "@/Constants/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";

const StudyLocation = ({ data }) => {
  const [show, setShow] = useState<number | null>(99999); // Use `null` to represent no card hovered
  const [showPopup, setShowPopup] = useState(false); // To toggle the popup
  const [index, setIndex] = useState<any>(null);
  const closePopup = () => {
    setShowPopup(false);
    // setShow(null);
    setIndex(null);
  };

  return (
    <>
      <div className="md:px-11 mt-20 w-full overflow-y-hidden   relative py-16 bg-white border-blue-800 overflow-hidden border-2">
        {/* Section Title */}
        <h2 className="text-2xl md:text-4xl  pb-8 font-extrabold text-center font-Montserrat italic capitalize   text-blue-800">
          Discover Top Study Hubs In India
        </h2>
        <div className="absolute md:block hidden -z-1 top-24">
          <Image
            src={AppAssets.indiamap}
            width={1900}
            height={1900}
            className="w-full h-"
            alt="Royal Defence academy"
          />
        </div>
        <div className="grid grid-cols-2 bg-white md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-6 md:gap-8 w-full">
          {data.map((hub, index) => (
            <div
              onMouseEnter={() => setShow(index)} // Set the hovered index
              onMouseLeave={() => setShow(null)} // Reset hover state when mouse leaves
              key={index}
              className={`relative 2xl:py-3 ${
                show != index && "bg-white"
              }  hover:cursor-pointer overflow-hidden   hover:shadow-xl transform transition duration-300 hover:scale-105`}
            >
              {/* Image */}
              <div
                className="relative bg-transparent h- w-40 flex justify-center mx-auto "
                onClick={() => {
                  setIndex(index);
                  setShowPopup(true);
                }}
              >
                {hub?.Image && (
                  <Image
                    title={hub?.image_alt || hub?.title}
                    src={hub?.Image}
                    alt={hub?.image_alt || hub?.title}
                    width={150}
                    height={150}
                    className="w-full h-full -md object-cover"
                  />
                )}
              </div>

              {/* Overlay on Hover */}
              {show != index && (
                <div className="absolute border-blue-800 border bg-white/80 hover:bg-white  backdrop-blur-md z-10 w-full h-[100%] top-0 text-center  hover:opacity-0 capitalize overflow-y-auto  transition duration-300 text-blue-800 text-lg   md:text-lg   flex flex-col items-start justify-start ">
                  <h2 className="font-semibold uppercase text-blue-800  text-center h-9 w-full line-clamp-1">
                    {" "}
                    {hub?.title}
                  </h2>

                  <div className="overflow-y-auto">
                    {" "}
                    {hub?.courses.map((item, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          window.open(
                            `/${item?.slug_field}/${data[index]?.title}`
                          )
                        }
                        // href={`/${item?.slug_field}/${data[index]?.title}`}
                        className="block border-b   leading-4 bg-transparent   hover:bg-white text-blue-800 px-1 text-xs transition-all duration-200   "
                      >
                        {" "}
                        {item?.short_title
                          .replaceAll("{Location}", "india")
                          .replaceAll("{location}", "india")}{" "}
                        in {data[index]?.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-2 bg-white/60">
                <h3 className="text-xl text-center uppercase font-Montserrat  text-blue-800 mb-2">
                  {hub?.title
                    .replaceAll("{Location}", "")
                    .replaceAll("{location}", "")}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {hub?.short_description
                    .replaceAll("{Location}", "")
                    .replaceAll("{location}", "")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-hidden pb-2 bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="relative bg-white    w-full max-w-lg transition-all duration-500 transform scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 -full w-8 h-8 flex items-center justify-center"
              onClick={closePopup}
            >
              ✕
            </button>

            {/* Top heading with gradient background */}
            <h3 className="text-2xl font-bold text-white text-center mb-2 p-4 bg-blue-800   -t-lg">
              Top Courses in {data[index]?.title}
            </h3>

            <ol className="space-y-1  px-3 overflow-y-auto">
              {data[index]?.courses.map((item, i) => (
                <li key={i}>
                  <Link
                    target="_blank"
                    href={`/${item?.slug_field}/${data[index]?.title}`}
                    className="block bg-white text-blue-800 px-2 py-1 text-left  text-sm border-b  transition-all duration-200 hover:shadow-lg"
                  >
                    {item?.short_title} in {data[index]?.title}
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-6 text-center mx-3 flex items-center justify-center">
              <button
                onClick={closePopup}
                className="bg-blue-800 mb-2 w-full text-white px-4 py-2 -lg   hover:bg-blue-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudyLocation;
