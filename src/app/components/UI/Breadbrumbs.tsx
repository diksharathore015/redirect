/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
// import a from "next/a";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // Icon for separator

import Jdata from "../../data/Jdata.json";
import LineSkeleton from "../skeleton/LineSkeleton";
import apiDataController from "@/controllers/RequestController";
import { Constants } from "@/Constants/urls";

export default function Breadcrumbs({
  baseURL = "",
  location = "india",
  imagearr,
  title,
  coursepagemetatitle = "sainik school coaching",
  coursemaintitle = "courses",
}: any) {
  const path = usePathname();
  // const test = path.split("/");
  const imagearray = imagearr?.slice(0, 4);
  // console.log("imagearrimagearr", imagearr?.slice(0, 4));
  // Generate breadcrumb paths dynamically

  const segments = path.split("/").splice(1);
  // console.log("location...", segments);

  const breadcrumbList2 = [
    // Home breadcrumb
    {
      "@type": "ListItem",
      position: 1,
      name: Jdata?.home?.title?.replaceAll("-", " ") || "Home",
      item: baseURL,
      image: imagearray[0]?.image || "", // Assign the first image
    },
    // Courses breadcrumb (if not on "/course")
    ...(segments[0] !== "course"
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: coursepagemetatitle?.replaceAll("-", " ") || coursemaintitle,
            item: `${baseURL}/course"`,
            image: imagearray[1]?.image || "", // Assign the second image
          },
        ]
      : []),
    // Dynamic breadcrumbs for path segments
    ...segments.map((segment, index) => {
      return {
        "@type": "ListItem",
        position: segments[0] !== "course" ? index + 3 : index + 2,
        name:
          index === segments.length - 1
            ? coursemaintitle?.replaceAll(
                /(?:\{location\}|\{Location\}|\{royal defence \})/g,
                `${location || "india"}`
              )
            : decodeURIComponent(
                segments
                  .slice(0, index + 1)
                  .join("/")
                  .replaceAll("-", " ")
              ),
        item: `${baseURL}/${segments.slice(0, index + 1).join("/")}`,
        image: imagearray[index + 2]?.image || "",
      };
    }),
  ];

  // Create JSON-LD schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList2,
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, []);
  // console.log("breadcrumbList2", breadcrumbList);
  // console.log("breadcrumbList2", breadcrumbList2);
  return (
    breadcrumbSchema && (
      <>
        {/* Inject JSON-LD for rich snippet */}
        {
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema),
            }}
          />
        }

        {show ? (
          <div className="w-full md:w-[100%] mx-auto  mt-4  bg-gray-100 px-2   ">
            <nav className=" inline items-center ms:space-x-2 text-[2px]     text-gray-700">
              {/* Home a */}
              <a
                hrefLang="en"
                href="/"
                className="text-blue-600 inline hover:text-blue-800 hover:font-semibold hover:underline  md:mt-0  leading-2 md:font-semibold transition-all ease-in-out text-xs md:text-sm tracking-tight  capitalize"
              >
                {Jdata?.home?.title}
              </a>
              {segments[0] != "course" && (
                <a
                  hrefLang="en"
                  href="/course"
                  className="text-blue-600 inline hover:text-blue-800 hover:font-semibold hover:underline md:mt-0 -mt-2 md:font-semibold transition-all ease-in-out text-xs md:text-sm tracking-tight  capitalize"
                >
                  <FaChevronRight className="text-blue-700 px-1  font-bold  text-xs md:text-sm tracking-tight  md:-mt-1 inline" />
                  {coursepagemetatitle}
                </a>
              )}
              {/*  */}
              {/* india url */}
              <a
                hrefLang="en"
                href={`/${segments[0]}`}
                className="text-blue-600 inline hover:text-blue-800 hover:font-semibold hover:underline md:mt-0 -mt-2  leading-2 md:font-semibold transition-all ease-in-out text-xs md:text-sm tracking-tight  capitalize"
              >
                <FaChevronRight className="text-blue-700 px-1  font-bold  text-xs md:text-sm tracking-tight  md:-mt-1 inline" />

                {coursemaintitle?.replaceAll(
                  /(?:\{location\}|\{Location\}|\{royal defence \})/g,
                  `india`
                )}
              </a>
              {segments.length === 1 && segments[0] === "course" && (
                <label
                  htmlFor=""
                  className="text-blue-600 inline hover:text-blue-800 hover:font-semibold hover:underline md:mt-0 -mt-2 leading-2 md:font-semibold transition-all ease-in-out text-xs md:text-sm tracking-tight capitalize"
                ></label>
              )}

              {/* Dynamic Breadcrumbs */}

              {segments.length != 1 && (
                <FaChevronRight className="text-blue-700 px-1  font-bold  text-xs md:text-sm tracking-tight  -mt-2 inline" />
              )}
              {segments.length > 1 &&
                segments.slice(0, 1).map((item: string, i: number) => (
                  <React.Fragment key={i}>
                    <a
                      hrefLang="en"
                      href={`/${segments.join("/")}`}
                      className="text-blue-600 hover:text-blue-800 hover:font-semibold hover:underline   leading-2 inline md:font-semibold transition-all ease-in-out text-xs md:text-sm tracking-tight "
                    >
                      {i == 0
                        ? title
                          ? title
                          : decodeURIComponent(item.replaceAll("-", " "))
                        : ""}
                      {i != 0 && decodeURIComponent(item.replaceAll("-", " "))}
                    </a>

                    {/* Display separator unless it's the last breadcrumb */}
                    {/* {i < segments.length - 1 && (
                )} */}
                  </React.Fragment>
                ))}
            </nav>
          </div>
        ) : (
          <LineSkeleton />
        )}
      </>
    )
  );
}
