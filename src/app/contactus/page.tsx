import React from "react";
import EnquiryForm from "../components/forms/EnquiryForm";
import apiDataController from "@/controllers/RequestController";
import { Constants, fetchBaseUrl } from "@/Constants/urls";
import { get } from "@/actions/actions";
import HomeInfo from "../components/home/HomeInfo";
export async function generateMetadata({ params, searchParams }) {
  const seoData = await get(Constants.seo);
  const baseURL = fetchBaseUrl();
  <link rel="icon" href={seoData[0]?.logo} type="image/x-icon" sizes="any" />;
  <link rel="canonical" href={seoData[0]?.canonical_url} />;
  // console.log("firstfirstfirstfirstfirst",seoData[0])
  return {
    title: ` ${seoData[0]?.title} - Royal Defence Academy - Contact Us`,
    description: seoData[0]?.description,
    keywords: seoData[0]?.keyword,
    charset: "utf-8",
    logo: {
      "@type": "ImageObject",
      url: seoData[0]?.logo, // Replace with the correct logo URL
      width: 512, // Optional, provide actual dimensions if available
      height: 512, // Optional, provide actual dimensions if available
    },

    openGraph: {
      title: seoData[0]?.title.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      ),
      description: seoData[0]?.og_description.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      ),
      url: baseURL,
      siteName: `Home- ${seoData[0]?.title.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      )}`,
      type: "website", // or 'article', 'product', etc.
      images: [
        {
          url: seoData[0]?.og_image,
          width: 1200,
          height: 630,
          alt:
            seoData[0]?.og_title.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              `${params?.slug?.length > 1 ? params.slug[1] : ""}`
            ) || "Default OG Image Alt",
        },
      ],
    },

    twitter: {
      card: seoData[0]?.twitter_card,
      title: seoData[0]?.title.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      ),
      description: seoData[0]?.description,
      images: [seoData[0]?.og_image],
    },

    viewport: "width=device-width, initial-scale=1.0",
    robots: {
      index: true, // or false
      follow: true, // or false
    },

    alternates: {
      canonical: seoData[0]?.canonical_url || baseURL, // Replace with your default canonical URL
    },
  };
}

export default async function page() {
  const controller = new apiDataController();

  const seodata: any = await controller.getDataApi(Constants.seo);
  const courselist = await controller.GetApi(Constants.headerCourses);
  // console.log("seodataseodata", seodata[0]);
  return (
    <div className="py-10">
      <h1 className="text-center font-baskervville  font-semibold text-5xl py-2 pt-4    text-blue-800">
        {" "}
        Royal Defence Academy - Contact Us
      </h1>
      <h2 className="font-bold font-baskervville text-blue-900  text-center">
        Best Boarding School Coaching for Boys and Girls: AISSEE, Sainik School,
        Military School, RIMC, and RMS 2025.
      </h2>

      <div className="w-full -mt-16 mb-10">
        <EnquiryForm coursesData={courselist} />
      </div>
      {<HomeInfo seoData={seodata[0]} />}
    </div>
  );
}
