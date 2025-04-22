"use client";
import { store, useAppSelector } from "@/store";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPhone } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { setHomepageTitle } from "@/store/homepageSlice";
import MainSlider from "../UI/MainSlider";

const CourseTopSection = ({ data }: any) => {
  const [imagesData, setimagesData] = useState<any>(data?.images);
  const pathname = usePathname();

  const [currentLocation, setCurrentLocation] = useState("");
  useEffect(() => {
    if (pathname.split("/").filter(Boolean).length > 1) {
      setCurrentLocation(pathname.split("/").filter(Boolean)[1]);
    }
  }, [pathname]);

  useEffect(() => {
    store.dispatch(setHomepageTitle(data.title));
  }, [data]);

  return (
    <div className="flex items-start mt-8 justify-start gap-3 w-[95%] mx-auto">
      {/* Course Image */}
      {/* <Image  
        width={700}
        height={400}
        src={data.image}
        alt={data.image_alt}
        className="object-cover w-[25%] h-auto"
      /> */}

      {/* Course Details */}
      <div className="flex justify-between w-[95%]  ">
        <div className=" ">
          {/* Course Title */}
          <h1
            // onClick={() => console.log("first", imagesData)}
            className="text-5xl font-extrabold text-gray-900 capitalize"
          >
            {data.title}
            {currentLocation && " In"} {currentLocation}
          </h1>
          {/* <TopStudents students={data?.images}/> */}
          {
            <MainSlider
              responsive={[
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 6, slidesToScroll: 1 },
                },
                {
                  breakpoint: 768,
                  settings: { slidesToShow: 4, slidesToScroll: 1 },
                },
                {
                  breakpoint: 480,
                  settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
                {
                  breakpoint: 400,
                  settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
                {
                  breakpoint: 400,
                  settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
              ]}
              slides={imagesData.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-center  md:px-2 items-center w-full my-1 md:my-4 md:mx-3 "
                >
                  <div className="group flex flex-col items-center justify-center w-full text-center relative">
                    <div className="relative   h-[170px] w-[170px]  md:w-42 md:h-48 bg-transparent shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-md flex items-center justify-center">
                      {
                        <Image
                          title={
                            item?.image_alt ||
                            item?.title ||
                            item?.meta_title ||
                            "img"
                          }
                          src={item?.Image ?? item?.image}
                          alt={
                            item?.image_alt ||
                            item?.title ||
                            item?.meta_title ||
                            "img"
                          }
                          width={400}
                          height={400}
                          loading="eager"
                          className="object-cover rounded-md md:mt-0 mt-1 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 md:w-48  md:h-48 h-[170px] w-[170px] mx-auto"
                        />
                      }
                      <p className="absolute inset-x-0 bottom-0 bg-blue-100 px-1 text-[8px] md:text-[10px] text-primary  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center capitalize">
                        {item?.description ?? item?.meta_description}
                      </p>
                    </div>

                    {/* Title */}
                    <p className="md:mt-4 mt-2 text-xs md:text-sm text-center line-clamp-2 text-white font-rowdies font-semibold uppercase tracking-wide">
                      {item?.meta_title}
                    </p>
                  </div>
                </div>
              ))}
              slidesToScroll={3}
              slidesToShow={6}
              autoplay={true}
              infinite={true}
              autoplaySpeed={1000}

              // showDots={true}
            />
            // <Slider {...settings}>
            //   {imagesData.map((item: any, i: number) => (
            //     <div
            //       key={i}
            //       className="flex justify-center  md:px-2 items-center w-full my-1 md:my-4 md:mx-3 "
            //     >
            //       <div className="group flex flex-col items-center justify-center w-full text-center relative">
            //         <div className="relative   h-[170px] w-[170px]  md:w-42 md:h-48 bg-transparent shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-md flex items-center justify-center">
            //           {
            //             <Image
            //               title={
            //                 item?.image_alt ||
            //                 item?.title ||
            //                 item?.meta_title ||
            //                 "img"
            //               }
            //               src={item?.Image ?? item?.image}
            //               alt={
            //                 item?.image_alt ||
            //                 item?.title ||
            //                 item?.meta_title ||
            //                 "img"
            //               }
            //               width={400}
            //               height={400}
            //               loading="eager"
            //               className="object-cover rounded-md md:mt-0 mt-1 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 md:w-48  md:h-48 h-[170px] w-[170px] mx-auto"
            //             />
            //           }
            //           <p className="absolute inset-x-0 bottom-0 bg-blue-100 px-1 text-[8px] md:text-[10px] text-primary  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center capitalize">
            //             {item?.description ?? item?.meta_description}
            //           </p>
            //         </div>

            //         {/* Title */}
            //         <p className="md:mt-4 mt-2 text-xs md:text-sm text-center line-clamp-2 text-white font-rowdies font-semibold uppercase tracking-wide">
            //           {item?.meta_title}
            //         </p>
            //       </div>
            //     </div>
            //   ))}
            // </Slider>
          }
          {/* Short Description */}
          <div className="text-lg mt-4   text-gray-900 leading-relaxed">
            {data?.description}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 justify-end w-[50%] mx-auto text-3xl">
          <a
            href={`tel:${data.contact_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <BiPhone />
          </a>
          <a
            href={data.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href={data.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebook />
          </a>
          <a
            href={data.youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseTopSection;
