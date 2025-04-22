/* eslint-disable prefer-const */
"use client";
import { AppAssets } from "@/Constants/assets";
import { store } from "@/store";
import { setCourseLocation, setHomepageTitle } from "@/store/homepageSlice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Breadbrumbs from "../UI/Breadbrumbs";
import Comman from "../skeleton/Comman";
import CourseDescription from "./CourseDescription";
import CourseTable from "./CourseTable";
import SubAreaList from "./SubAreaList";
import MainSlider from "../UI/MainSlider";
import FAQ from "../home/Faqs";

export default function Main({
  baseURL ="" ,
  coursepagemetatitle,
  faqs = "",
  data,
  currentDate,
  matchinglocation,
  locationdatas,
 
}: any) {
  const pathname = usePathname();
  // console.log("current pathname is locationdatas", data);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathSegments = pathname?.split("/").filter(Boolean);
  const [currentLocation, setCurrentLocation] = useState<any>(
    pathSegments?.length > 2
      ? pathSegments[2]
      : pathSegments?.length < 2
      ? pathSegments[1]
      : "india"
  );

  const [randomTitle, setRandomTitle] = useState(
    currentLocation ? "" : data?.title ?? "Royal Defence Academy"
  );
  const [randomDescription, setRandomDescription] = useState<any>();
  const [multipleImage, setmultipleImage] = useState<any>([
    ...data?.images.slice(data?.id, data?.id + 3),
  ]);
  const [locationType, setLocationType] = useState<any>("India");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = pathname?.split("/").filter(Boolean);

      if (pathSegments.length > 1) {
        const location = decodeURIComponent(
          pathSegments[pathSegments.length - 1].toLowerCase()
        ).replace(" ", "");

        setCurrentLocation(location);
        store.dispatch(setCourseLocation(location));

        const findMatchingState = () => {
          const matchedState = data?.states.find(
            (item) =>
              decodeURIComponent(item?.title.toLowerCase()).replace(" ", "") ===
              location
          );
          if (matchedState) return { type: "state", matchedItem: matchedState };

          const matchedCity = data?.cities.find(
            (item) =>
              decodeURIComponent(item?.title.toLowerCase()).replace(" ", "") ===
              location
          );
          if (matchedCity) {
            // Find the state that corresponds to this city.
            // It is assumed that matchedCity.state holds the state ID.
            const correspondingState = data?.states.find(
              (state) => state.id === matchedCity.state
            );

            return {
              type: "city",
              matchedItem: matchedCity,
              stateName: correspondingState ? correspondingState.title : null,
            };
          }
          //  return { type: "city", matchedItem: matchedCity };

          const matchedLocality = data?.localities.find(
            (item) =>
              decodeURIComponent(item?.title.toLowerCase()).replace(" ", "") ===
              location.toLowerCase()
          );

          if (matchedLocality) {
            // Assume each locality object has a "city" property containing the city ID
            const correspondingCity = data.cities.find(
              (city) => city.id == matchedLocality.city
            );
            // console.log("correspondingCity", correspondingCity);
            // Then find the state corresponding to the found city
            const correspondingState = correspondingCity
              ? data?.states.find((state) => state.id === correspondingCity.id)
              : null;

            return {
              type: "locality",
              matchedItem: matchedLocality,
              cityName: correspondingCity ? correspondingCity.title : null,
              stateName: correspondingState ? correspondingState.title : null,
            };
          }
          return null; // Return null if no match is found
        };

        const matchingState = findMatchingState();
        // console.log("matchingState", matchingState);
        if (matchingState) {
          setLocationType(matchingState);
          if (data?.multiple_title?.length) {
            const titleIndex =
              matchingState?.matchedItem.id % data?.multiple_title.length;
            setRandomTitle(
              data?.multiple_title[titleIndex]?.title ||
                data?.multiple_title[0]?.title
            );
          } else {
            setRandomTitle(data?.title);
          }
          if (data?.multiple_description?.length) {
            const descIndex =
              matchingState?.matchedItem.id %
              data?.multiple_description?.length;
            setRandomDescription(
              data?.multiple_description[descIndex]?.description ||
                data?.multiple_description[0]?.description
            );
            setmultipleImage(
              data?.multiple_imagess?.slice(descIndex, descIndex + 10)
            );
          } else {
            setRandomDescription(data?.description);
          }
        } else {
          router.push("/");
        }
      }
      setIsLoading(false);
    }
  }, [pathname, data]);

  useEffect(() => {
    store.dispatch(setHomepageTitle(data?.title));
    setIsLoading(false);
  }, [data]);

  const imagearr = [
    ...data?.images.slice(0, Math.round(data?.images?.length / 2)),
    ...multipleImage.slice(0, 3),
    ...data?.images.slice(Math.round(data?.images?.length / 2)),
  ];

  let defaultAlt = data?.title;

  const [dateArr, setDateArr] = useState<any>(() => {
    return {
      date: currentDate.toISOString().slice(0, 19),
      startDate: currentDate.toISOString().split("T"),
      newDate: new Date(currentDate.setMonth(currentDate.getMonth() + 3))
        .toISOString()
        .split("T"),
    };
  });

  const [subarea, setSubArea] = useState<any>();
  useEffect(() => {
    if (locationType?.type == "state") {
      setSubArea(data?.cities);
    } else if (locationType?.type == "city") {
      setSubArea(data?.localities);
    } else if (locationType?.type == "locality") {
      setSubArea(data?.localities);
    } else {
      setSubArea(data?.states);
    }
    setIsLoading(false);
  }, [locationType, data]);
  const newLocation = locationType?.matchedItem?.title.replaceAll("-", " ");
  const metatitle = data?.meta_title
    .replaceAll(
      /(?:\{location\}|\{Location\})/g,
      `${
        locationType?.matchedItem?.title
          ? `${newLocation} ${
              `${locationType.cityName || ""} ${
                (locationType.type != "locality" && locationType.stateName) ||
                ""
              }` || ""
            }`
          : "india"
      }`
    )
    .replaceAll(
      /(?:\{state\}|\{State\})/g,
      locationType.stateName ||
        `${locationType.cityName}, ${locationType.stateName}` ||
        "" ||
        ""
    );
  // console.log("locationTypelocationType", locationType);

  return (
    <>
      <div className="bg-white overflow-x-hidden">
      <Breadbrumbs
      baseURL={baseURL}
          location={newLocation}
          imagearr={data?.images}
          coursemaintitle={data?.title}
          coursepagemetatitle={coursepagemetatitle}
          title={randomTitle
            .replaceAll(
              /(?:\{location\}|\{Location\}|\{royal defence \})/g,
              `${locationType?.matchedItem?.title ? newLocation : "india"}`
            )
            .replaceAll(
              /(?:\{State\}|\{state\}|\{royal defence \})/g,

              `${locationType.cityName || ""} ${
                (locationType.type != "locality" && locationType.stateName) ||
                ""
              }` ||
                "" ||
                ""
            )}
        />

        {!isLoading ? (
          <div>
            <h1 className="md:text-5xl text-lg tracking-normal mt-3  capitalize font-extrabold font-Montserrat text-blue-950  mx-auto w-[100%]">
              {randomTitle
                .replaceAll(
                  /(?:\{location\}|\{Location\}|\{royal defence \})/g,
                  `${locationType?.matchedItem?.title ? newLocation : "india"}`
                )
                .replaceAll(
                  /(?:\{State\}|\{state\}|\{royal defence \})/g,

                  `${locationType.cityName || ""} ${
                    (locationType.type != "locality" &&
                      locationType.stateName) ||
                    ""
                  }` ||
                    "" ||
                    ""
                )}
            </h1>

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
              slides={imagearr?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center w-full my-1 md:my-4 overflow-x-hidden"
                >
                  <div className="group overflow-hidden flex flex-col items-center justify-center w-full text-center relative">
                    <div className="relative w-full md:w-64 md:h-64 bg-transparent  ">
                      <Image
                        priority={false} // Lazy loading
                        quality={100}
                        title={
                          item?.image_alt?.replaceAll(
                            /\{location\}/gi,
                            locationType?.matchedItem?.title.replaceAll(
                              "-",
                              " "
                            ) || "india"
                          ) ||
                          item?.title?.replaceAll(
                            /\{location\}/gi,
                            locationType?.matchedItem?.title.replaceAll(
                              "-",
                              " "
                            ) || "india"
                          ) ||
                          item?.meta_title?.replaceAll(
                            /\{location\}/gi,
                            locationType?.matchedItem?.title.replaceAll(
                              "-",
                              " "
                            ) || "india"
                          )
                        }
                        src={
                          item?.Image ??
                          item?.image ??
                          item?.imagess ??
                          AppAssets.logo
                        }
                        alt={
                          item?.image_alt?.replaceAll(
                            /\{location\}/gi,
                            locationType?.matchedItem?.title.replaceAll(
                              "-",
                              " "
                            ) || "india"
                          ) ??
                          item?.title?.replaceAll(
                            /\{location\}/gi,
                            locationType?.matchedItem?.title.replaceAll(
                              "-",
                              " "
                            ) || "india"
                          ) ??
                          item?.meta_title?.replaceAll(
                            /\{location\}/gi,
                            locationType?.matchedItem?.title.replaceAll(
                              "-",
                              " "
                            ) || "india"
                          ) ??
                          "Royal Defence Academy"
                        }
                        width={170}
                        height={170}
                        className="object-fill bg-blue-800 p-1 -lg -md w-full md:w-64 md:h-64 mx-auto"
                      />
                      <p className="absolute inset-x-0 bottom-0 bg-white p-1 text-[12px] md:text-[12.5px] leading-[14px] text-gray-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -md capitalize">
                        {item?.short_description?.replaceAll(
                          /\{location\}/gi,
                          locationType?.matchedItem?.title.replaceAll(
                            "-",
                            " "
                          ) || "india"
                        )}
                      </p>
                    </div>
                    <p className="md:mt-2 mt-2 px-2 text-xs md:text-xs text-center text-blue-800 font-semibold capitalize tracking-wide">
                      {item?.meta_title
                        ?.replaceAll(/\{location\}/gi, newLocation || "india")
                        .replaceAll(
                          /(?:\{State\}|\{state\}|\{royal defence \})/g,
                          locationType.stateName ||
                            `${locationType.cityName}, ${locationType.stateName}` ||
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

            {metatitle && (
              <div>
                <h2 className="md:text-xl text-sm font-semibold font-sans w-[100%] mx-auto">
                  {metatitle}
                </h2>
                <p className="text-normal font-sans  mx-auto">
                  {data?.meta_description
                    .replaceAll(
                      /(?:\{location\}|\{Location\})/g,
                      `${
                        locationType?.matchedItem?.title ? newLocation : "india"
                      }`
                    )
                    .replaceAll(
                      /(?:\{State\}|\{state\}|\{royal defence \})/g,

                      `${locationType.cityName || ""}, ${
                        locationType.stateName || ""
                      }`
                    )}
                </p>
              </div>
            )}
            {!currentLocation && (
              <h3 className="  mx-auto py-3 md:text-xl text-sm capitalize">
                {data?.short_description
                  ? data?.short_description
                      .replaceAll(
                        /(?:\{location\}|\{Location\})/g,
                        `${
                          locationType?.matchedItem?.title
                            ? newLocation
                            : "india"
                        }`
                      )
                      .replaceAll(
                        /(?:\{State\}|\{state\}|\{royal defence \})/g,

                        `${locationType.cityName || ""}, ${
                          locationType.stateName || ""
                        }`
                      )
                  : defaultAlt
                      .replaceAll(
                        /(?:\{location\}|\{Location\})/g,
                        `${
                          locationType?.matchedItem?.title
                            ? newLocation
                            : "india"
                        }`
                      )
                      .replaceAll(
                        /(?:\{State\}|\{state\}|\{royal defence \})/g,

                        `${locationType.cityName || ""}, ${
                          locationType.stateName || ""
                        }`
                      )}
              </h3>
            )}
            {randomDescription && (
              <div>
                <CourseDescription
                  description={randomDescription
                    .replaceAll(
                      /(?:\{location\}|\{Location\})/g,
                      `${currentLocation ? newLocation || "india" : "india"}`
                    )
                    .replaceAll(
                      /(?:\{State\}|\{state\}|\{royal defence \})/g,
                      `${locationType.cityName || ""}, ${
                        locationType.stateName || " "
                      } ${locationType.matchedItem.pincode || ""}`
                    )}
                  currentLocation={newLocation || "india"}
                />
              </div>
            )}
            {
              <div className=" md:w-full   mx-auto md:grid  md:grid-cols-5 grid grid-cols-1 md:mx-auto md:gap-y-9 r  my-10">
                {currentLocation
                  ? multipleImage.map((item: any, i: any) => (
                      <div
                        key={i}
                        className="group flex flex-col   w-full   items-center justify-center   text-center relative"
                      >
                        <div className="relative mb-2 md:px-3 w-full  bg-transparent -lg transform md:hover:scale-105 -lg">
                          {
                            <Image
                              priority={false} // Keep `false` for lazy loading
                              quality={100}
                              title={
                                item?.image_alt
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  ) ||
                                item?.title
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  ) ||
                                item?.meta_title
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  )
                              }
                              src={
                                item?.Image ??
                                item?.image ??
                                item?.imagess ??
                                AppAssets.logo
                              }
                              alt={
                                item?.image_alt
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  ) ??
                                item?.title
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  ) ??
                                item?.meta_title
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  ) ??
                                item?.title
                                  ?.replaceAll(
                                    /\{location\}/gi,
                                    newLocation || "india"
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    `${locationType.cityName || ""}, ${
                                      locationType.stateName || ""
                                    }`
                                  ) ??
                                "Royal Defence Academy"
                              }
                              width={170}
                              height={170}
                              className="object-fill   bg-gradient-to-r from-red-400 to-pink-500  hover:cursor-pointer -lg -md transform md:hover:scale-105 w-[98%] md:h-full  md:px-1 p-2 mx-auto "
                            />
                          }
                          <p className="absolute inset-x-0 bottom-2 font-bold  md:bottom-0 bg-white p-1 text-[12px] md:text-[12.5px] leading-[14px] text-gray-600  opacity-0 group-hover:opacity-100 transition-opacity duration-300  -md capitalize  flex justify-start ">
                            {item?.description
                              ? item?.meta_description
                                  .replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  )
                              : item?.meta_title
                              ? item?.meta_title
                                  .replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    locationType.stateName ||
                                      `${locationType.cityName || ""}, ${
                                        locationType.stateName || ""
                                      }`
                                  )
                              : defaultAlt
                                  .replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )
                                  .replaceAll(
                                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                                    `${locationType.cityName || ""}, ${
                                      locationType.stateName || ""
                                    }`
                                  )}
                          </p>
                        </div>
                      </div>
                    ))
                  : data?.multiple_imagess
                      .slice(0, 20)
                      .map((item: any, i: any) => (
                        <div
                          key={i}
                          className="group flex flex-col md:gap-2 w-full     items-center justify-center   text-center relative"
                        >
                          <div className="relative mb-5 md:mb-2    md:mx-2 bg-transparent -lg transform md:hover:scale-105  ">
                            {
                              <Image
                                priority={false} // Keep `false` for lazy loading
                                quality={100}
                                title={
                                  item?.image_alt.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  ) ||
                                  item?.title.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  ) ||
                                  item?.meta_title.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )
                                }
                                src={
                                  item?.Image ??
                                  item?.image ??
                                  item?.imagess ??
                                  AppAssets.logo
                                }
                                alt={
                                  item?.image_alt.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  ) ??
                                  item?.title.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  ) ??
                                  item?.meta_title.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  ) ??
                                  item?.title.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  ) ??
                                  "Royal Defence Academy"
                                }
                                width={170}
                                height={170}
                                className="md:object-fill  bg-gradient-to-r from-red-400 to-pink-500 p-1 hover:cursor-pointer -lg -md transform  md:hover:scale-105 w-full mx-auto "
                              />
                            }
                            <p className="absolute inset-x-0 bottom-1  font-bold md:bottom-0  bg-white p-1 text-[14px] md:text-[15px] leading-[14px] text-gray-600 mx-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300  -md capitalize  flex justify-start ">
                              {item?.description
                                ? item?.meta_description.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )
                                : item?.meta_title
                                ? item?.meta_title.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )
                                : defaultAlt.replaceAll(
                                    /(?:\{location\}|\{Location\})/g,
                                    `${currentLocation ? newLocation : "india"}`
                                  )}
                            </p>
                          </div>
                        </div>
                      ))}
              </div>
            }
            {!currentLocation && (
              <CourseDescription
                description={data?.description
                  .replaceAll(
                    /(?:\{location\}|\{Location\})/g,
                    `${
                      currentLocation
                        ? `${newLocation}  ${locationType.cityName || ""}, ${
                            locationType.stateName || ""
                          }`
                        : "india"
                    }`
                  )
                  .replaceAll(
                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                    `${locationType.cityName || ""}, ${
                      locationType.stateName || ""
                    } ,${locationType?.matchedItem?.pincode || ""}`
                  )}
                currentLocation={locationType?.matchedItem?.title
                  .replaceAll("-", " ")
                  .replaceAll(
                    /(?:\{State\}|\{state\}|\{royal defence \})/g,
                    `${locationType.cityName || ""}, ${
                      locationType.stateName || ""
                    } ,${locationType.matchedItem.pincode || ""}`
                  )}
              />
            )}
            {
              <div className="mx-auto w-full my-6">
                <CourseTable
                  locationdatas={locationdatas}
                  course={data}
                  currentLocation={newLocation || "india"}
                  newDate={dateArr.newDate}
                  startDate={dateArr.startDate}
                />
              </div>
            }
            {faqs.length > 0 && (
              <FAQ faqsData={faqs} locationdatas={locationdatas} />
            )}

            {
              <div className="mx-auto w-full my-6">
                <SubAreaList
                  locationdatas={locationdatas}
                  imageArr={data?.images}
                  defaultAlt={defaultAlt}
                  currentLocation={locationType?.matchedItem?.title.replaceAll(
                    "-",
                    " "
                  )}
                  subarea={subarea}
                  locationType={locationType}
                  data={data}
                />
              </div>
            }
          </div>
        ) : (
          // my loader
          <Comman />
        )}
      </div>
    </>
  );
}
