import Main from "@/app/components/courses/Main";
import SubCategoryDetail from "@/app/components/courses/SubCategoryDetail";
import InnerPageMeta from "@/app/components/metas/InnerPageMeta";
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
  const param = await params;
  
  const controller = new apiDataController();
  const singleSubCourse = await controller.getDataApi(
    `${Constants.subCourse}?slug_field=${param?.slug[0]}`
  );

  return (
    <>
      <InnerPageMeta data={singleSubCourse[0]} />
      <div className=" h-full ">
        <SubCategoryDetail course={singleSubCourse[0]} />
      </div>
    </>
  );
}
