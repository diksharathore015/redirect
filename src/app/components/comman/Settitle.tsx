"use client";
import { store } from "@/store";
import { setHomepageTitle } from "@/store/homepageSlice";
import React, { useEffect } from "react";

export default function Settitle({ data }: any) {
  useEffect(() => {
    store.dispatch(setHomepageTitle(data));
  }, []);
  return <div></div>;
}
