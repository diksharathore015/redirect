"use client";
import { store, useAppSelector } from "@/store";
import { setHomepageTitle, setLocation } from "@/store/homepageSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TopBar({ data, seodata }: any) {
  const path = usePathname();

  const routeArray = path.split("/").filter(Boolean);
  if (routeArray.length > 2 && !routeArray.includes("subcategory")) {
    if (!data.some((item: any) => item.title == routeArray[2])) {
      window.location.href = "/not-found/";
    } else {
      store.dispatch(setLocation(routeArray[2]));
    }
  }
  useEffect(() => {
    store.dispatch(setHomepageTitle(seodata));
  }, []);

  return (
    <div
      className={`md:flex md:px-4 px-0  capitalize  md:items-center md:justify-between flex flex-col justify-center items-center md:flex-row bg-primary p-0 text-white md:p-2`}
    >
      <h1 className="md:text-xl text-normal   font-bold md:text-left text-center ">
        {useAppSelector((state) => state.HomepageReducer.homepageTitle) ??
          "Royal Defence Academy"}
      </h1>
    </div>
  );
}
