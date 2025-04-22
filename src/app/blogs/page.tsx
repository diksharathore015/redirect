import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
// import { store } from "@/store";
// import { setHomepageTitle } from "@/store/homepageSlice";
import BlogCard from "../components/blogs/BlogCard";
import { AppAssets } from "@/Constants/assets";
import { Metadata } from "next";
import Image from "next/image";
// import Redirectblog from "../components/blogs/Redirectblog";
export const revalidate = 600;
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function page() {
  const controller = new apiDataController();
  const blogsData = await controller.getDataApi(`${Constants.allblogs}`);
  return (
    <>
      {/* <Redirectblog data={blogsData} /> */}
      <div className=" w-[100%]  mx-3 my-5">
        <h1 className="md:text-4xl text-base md:font-extrabold flex items-center  bg-gray-200 -md">
          <span className="inline-block">
            <Image
              src={AppAssets.logo}
              alt="Royal Defence Academy"
              width={400}
              height={400}
              className="md:w-24 md:h-24 w-20 h-20 "
            />
          </span>
          Insights & Inspiration: Browse Our Blog Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 mx-4">
          {blogsData &&
            blogsData?.map((blog: any, i: number) => (
              <BlogCard blog={blog} key={i} />
            ))}
        </div>
      </div>
    </>
  );
}
