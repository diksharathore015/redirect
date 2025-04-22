import Main from "@/app/components/courses/Main";
import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
 
 

  return (
    <div className=" h-full bg-red-400 ">
      {/* {course && <Main data={course[0]} />} */}
      {/* <div className="bg-red-400">
          <h1 className="text-lg text-black">{course?.title}</h1>
        </div> */}
    </div>
  );
}
