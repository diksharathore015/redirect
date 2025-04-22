import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
// import { store } from "@/store";
// import { setHomepageTitle } from "@/store/homepageSlice";

import { AppAssets } from "@/Constants/assets";
import { Metadata } from "next";
import Image from "next/image";
import BlogCard from "../components/blogs/BlogCard";
export const revalidate = 60;
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const controller = new apiDataController();
  const newsData = await controller.getDataApi(`${Constants.news}`);

  return (
    <>
      <div className=" w-[95%] mx-auto my-5">
        <h1 className="md:text-4xl text-base md:font-extrabold font-bold flex items-center  bg-gray-200 rounded-md">
          <span className="inline-block">
            {" "}
            <Image
              src={AppAssets.logo}
              alt="Royal Defence Academy"
              width={400}
              height={400}
              className="md:w-24 md:h-24 w-20 h-16 "
            />
          </span>{" "}
          Insights & Inspiration: Browse Our News Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 ">
          {newsData &&
            newsData?.map((blog: any, i: number) => (
              <BlogCard blog={blog} key={i} type={"news"} />
            ))}
        </div>
      </div>
    </>
  );
}
