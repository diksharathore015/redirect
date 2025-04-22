import React from "react";
import Form from "../components/forms/LocationForm";

import { Constants } from "@/Constants/urls";
import { get } from "@/actions/actions";
import apiDataController from "@/controllers/RequestController";

export default async function page({ searchParams }: { searchParams: any }) {
  const param = await searchParams;

  const controller = new apiDataController();
  const data = await controller.GetApi(`${Constants.coursesSlug}`);

  return (
    <>
       
      <meta name="robots" content="noindex, nofollow" />
      <Form slug={param.slug} slugdata={data} />
    </>
  );
}
