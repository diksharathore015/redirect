"use client";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import BlogDetail from "./BlogDetail";
import { store } from "@/store";
import { setHomepageTitle } from "@/store/homepageSlice";
import BannerSkeleton from "../skeleton/BannerSkeleton";
import HeadingSkeleton from "../skeleton/HeadingSkeleton";
import RawHtmlRenderer from "../UI/RawHtmlRendererProps";

export default function BlogsMain({ filterdata, data, type }: any) {
  const [maindata, setMainData] = useState<any>(filterdata);

  // Memoize JSON-LD data for better performance
  // const jsonLd = useMemo(() => {
  //   const source = filterdata || data[0];
  //   if (!source) return null;

  //   return {
  //     "@context": "https://schema.org",
  //     "@type": "BlogPosting",
  //     headline: source.title,
  //     description: source.description,
  //     image: source.image,
  //     author: {
  //       "@type": "Organization",
  //       name: source.author,
  //     },
  //     publisher: {
  //       "@type": "Organization",
  //       name: source.publisherName,
  //       logo: {
  //         "@type": "ImageObject",
  //         url: source.publisherLogo,
  //       },
  //     },
  //     datePublished: source.datePublished,
  //     dateModified: source.dateModified,
  //     mainEntityOfPage: {
  //       "@type": "WebPage",
  //       "@id": source.url,
  //     },
  //     keywords: source.keywords,
  //     articleSection: source.articleSection,
  //     wordCount: source.wordCount,
  //     articleBody: source.articleBody,
  //     url: source.url,
  //   };
  // }, [filterdata, data]);

  // // Dispatch homepage title once when filterdata or data changes
  // useEffect(() => {
  //   // const title = filterdata?.title || data[0]?.title;
  //   // if (title) store.dispatch(setHomepageTitle(title));
  //   setMainData(filterdata || data[0]);
  // }, [filterdata, data]);

  const [show, setShow] = useState(false);

  return (
    <>
      {/* {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )} */}

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Left side: Selected blog */}
          <div className="lg:w-[70%] bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {maindata?.title}
            </h1>

            <div className="mb-6">
              <Image
                title={maindata?.title ?? "Image"}
                src={maindata?.image}
                alt={maindata?.title ?? "Image"}
                width={500}
                height={500}
                quality={50}
                className="rounded-lg object-fill w-full"
              />
            </div>

            <RawHtmlRenderer htmlContent={maindata?.description} />
          </div>

          {/* Right side: Blog list */}
          <div className="lg:w-[30%] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
              {type && `${type} List`}
            </h2>
            <ul className="space-y-4 w-full">
              {data &&
                data?.map((blog: any, i: number) => (
                  <BlogDetail blog={blog} key={i} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
