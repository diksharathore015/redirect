/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Head from "next/head";
import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Jdata from "../../data/Jdata.json";
import MainSlider from "../UI/MainSlider";
import SliderSkeleton from "../skeleton/SliderSkeleton";
import { useEffect, useState } from "react";
export default function TopStudents({ students }: any) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [students]);

  return (
    <>
      <div className="  py-10  w-full   bg-blue-800  ">
        <Head>
          {students && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  itemListElement: students.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "Person",
                      name:
                        item?.title.replaceAll(
                          /(?:\{location\}|\{Location\})/g,
                          ""
                        ) ??
                        item?.meta_title.replaceAll(
                          /(?:\{location\}|\{Location\})/g,
                          ""
                        ),
                      image: item?.Image ?? item?.image,
                      description:
                        item?.description ??
                        item?.meta_description.replaceAll(
                          /(?:\{location\}|\{Location\})/g,
                          ""
                        ),
                      url:
                        item?.url?.replaceAll(
                          /(?:\{location\}|\{Location\})/g,
                          ""
                        ) || "#", // Add a URL if available
                    },
                  })),
                }),
              }}
            />
          )}
        </Head>

        <h2 className="text-lg md:text-3xl font-extrabold text-center font-Montserrat italic capitalize  text-white bg-blue-800">
          {/*         Our Brightest Achievers */}
          {/* {data} */}
          &quot; {Jdata?.home?.title} &quot;
        </h2>
        <div className="w-full bg-blue-800 md:px-0 px-2 pt-5">
          {/* {data ?  */}

          {!loading ? (
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
                  settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
                {
                  breakpoint: 400,
                  settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
                {
                  breakpoint: 400,
                  settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
              ]}
              slides={students.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-center  md:px-2 items-center w-full my-1 md:my-4 md:mx-3 "
                >
                  <div className="group flex flex-col items-center justify-center w-full text-center relative">
                    {/* Image Container */}
                    <div className="relative   w-full  h-48    md:w-64 md:h-64 bg-transparent shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105   flex items-center justify-center overflow-hidden">
                      {item.Image && (
                        <Image
                          title={
                            item.image_alt ||
                            item.title.replaceAll(
                              /(?:\{location\}|\{Location\})/g,
                              ""
                            )
                          }
                          src={item.Image ?? item.image}
                          alt={
                            item.image_alt ||
                            item.title.replaceAll(
                              /(?:\{location\}|\{Location\})/g,
                              ""
                            )
                          }
                          width={150}
                          height={150}
                          className="object-cover h-48 mr-1 p-1 bg-gradient-to-r from-red-400 to-pink-500  md:mt-0 mt-1 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105  w-full  md:w-64 md:h-64  mx-auto"
                        />
                      )}
                      <p className="absolute inset-x-0 bottom-0 bg-blue-50 font-semibold leading-4   px-1 text-[8px] md:text-[12px] text-primary   opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center capitalize">
                        {item.description ??
                          item.meta_description.replaceAll(
                            /(?:\{location\}|\{Location\})/g,
                            ""
                          )}
                      </p>
                    </div>

                    {/* Title */}
                    <p className="md:mt-4 mt-2 text-xs md:text-sm text-center line-clamp-2 text-white font-rowdies font-semibold uppercase tracking-wide">
                      {item?.meta_title?.replaceAll(
                        /(?:\{location\}|\{Location\})/g,
                        ""
                      )}
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
          ) : (
            <SliderSkeleton />
          )}
        </div>
      </div>
      {/* {<MainForm coursesData={coursesData} />} */}
    </>
  );
}
