import React from "react";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { store } from "@/store";
import { setShowForm } from "@/store/homepageSlice";
import { useRouter } from "next/navigation";
import { AppAssets } from "@/Constants/assets";
import RatingComponent from "../UI/RatingComponent";

interface SubAreaProps {
  locationdatas?: any;
  imageArr: any;
  defaultAlt: string;
  currentLocation: string;
  subarea: any[];
  locationType: {
    type: string;
    matchedItem: { id: string | number };
  };
  data: any;
}

const SubAreaList: React.FC<SubAreaProps> = ({
  locationdatas,
  imageArr,
  defaultAlt,
  currentLocation = "na",
  subarea,
  locationType,
  data,
}) => {
  // console.log("subareacurrentLocation123", currentLocation);
  const names = [
    "Royal Defence Academy Elite Coaching",
    "Royal Defence Academy Victory Sainik Coaching",
    "Royal Defence Academy Defence Scholars",
    "Royal Defence Academy Bravehearts Military",
    "Royal Defence Academy Patriot Defence Institute",
    "Royal Defence Academy Glory Sainik Coaching",
    "Royal Defence Academy Shield Defence",
    "Royal Defence Academy National Cadet Training",
    "Royal Defence Academy Warrior Training",
    "Royal Defence Academy Future Cadets",
    "Royal Defence Academy Cadet Prep",
    "Royal Defence Academy Mission Defence",
    "Royal Defence Academy Valor Institute",
    "Royal Defence Academy Guardian Military",
    "Royal Defence Academy Champions Coaching",
  ];

  const locationId = locationdatas?.matchedItem?.id || 0;
  const address = `${names[locationId % names.length]}`;
  return (
    <div className="w-full ">
      <h2 className="my-6 md:text-3xl text-2xl font-bold">
        Get Best coaching{" "}
        {data.title.replaceAll(
          /(?:\{location\}|\{Location\})/g,
          `${currentLocation ? currentLocation : ""}`
        )}{" "}
        in {currentLocation}{" "}
      </h2>
      <div className="md:flex md:flex-wrap items-center justify-start gap-4 w-[100%] mx-auto">
        {subarea &&
          subarea
            .filter((item) =>
              locationType?.type === "state"
                ? item?.state === locationType?.matchedItem?.id
                : item?.city === locationType?.matchedItem?.id
            )
            .map((item, i) => (
              <div
                key={i}
                className="border  p-4 md:flex md:justify-start  md:items-start   gap-4 bg-white w-full"
              >
                {/* Left Section: Image */}
                <div
                  className="md:w-44 md:h-44 flex-shrink-0 hover:cursor-pointer"
                  onClick={() =>
                    window.open(`/${data?.slug_field}/${item?.title}`)
                  }
                >
                  <Image
                    width={140}
                    height={140}
                    src={
                      item?.Image ||
                      imageArr[i % imageArr?.length]?.image ||
                      AppAssets.logo
                    }
                    alt={
                      item?.image_alt || item?.title || "Royal Defence Academy"
                    }
                    className="w-full h-full   object-cover"
                  />
                </div>

                {/* Right Section: Content */}
                <div className="flex-grow">
                  {/* Institute Name */}
                  <h2
                    onClick={() =>
                      window.open(`/${data?.slug_field}/${item?.title}`)
                    }
                    className="text-lg hover:cursor-pointer font-bold text-gray-800 flex items-center gap-2"
                  >
                    {data?.short_title} in {item?.title.replaceAll("-", " ")}{" "}
                    <br />
                    {item?.short_description
                      ? item?.short_description
                          ?.replaceAll(
                            /(?:\{location\}|\{Location\})/g,
                            `${currentLocation ? currentLocation : ""}`
                          )
                          .replaceAll("-", " ")
                      : data?.short_title}{" "}
                    <span className="text-blue-500 text-sm font-medium bg-blue-100 px-2 ">
                      Verified
                    </span>
                  </h2>

                  {/* Ratings */}
                  <RatingComponent />

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 my-2">
                    <MdLocationOn className="text-gray-500 uppercase" />
                    <span className="uppercase font-semibold">
                      {names[item?.id % names.length]}{" "}
                      {item?.title.replaceAll("-", " ")} ,{" "}
                      {currentLocation == "na"
                        ? "India ,"
                        : `${currentLocation.replaceAll("-", " ")},`}
                      {item?.pincode ? item?.pincode : ""}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <h2 className="bg-gray-200 text-gray-800 text-xs px-2 py-1 -md">
                      Tutorials For {data?.short_title}
                    </h2>
                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 -md">
                      Coaching
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="md:flex md:items-center gap-2 ">
                    <Link
                      href={`https://wa.me/${item?.contact_number}`}
                      className="bg-green-500 text-white text-sm px-4 py-2 mb-1  flex items-center justify-center gap-2"
                    >
                      {item?.contact_number || data?.contact_number}
                      <FaWhatsapp />
                    </Link>
                    <button
                      onClick={() => {
                        store.dispatch(setShowForm(true));
                      }}
                      className="bg-blue-500 text-white text-sm px-4 py-2 mb-1  md:w-auto w-full "
                    >
                      Send Enquiry
                    </button>

                    <button
                      onClick={() => {
                        window.open(item?.youtube_link);
                      }}
                      className="bg-red-800 text-white text-sm px-4 py-2 mb-1  flex items-center  justify-center gap-2  md:w-auto w-full"
                    >
                      <FaYoutube size={18} /> {/* YouTube Icon */}
                      YouTube
                    </button>
                    <button
                      onClick={() => {
                        window.open(item?.instagram_link);
                      }}
                      className="bg-red-400 text-white text-sm px-4 py-2  mb-1 flex items-center  justify-center  gap-2  md:w-auto w-full"
                    >
                      <FaInstagram size={18} /> {/* Instagram Icon */}
                      Instagram
                    </button>
                  </div>
                </div>

                {/* Right Section: Extras */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <AiOutlineHeart
                    className="text-gray-400 text-2xl cursor-pointer"
                    onClick={() =>
                      window.open(`/${data?.slug_field}/${item?.title}`)
                    }
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {30 + i * 2} people recently enquired
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SubAreaList;
