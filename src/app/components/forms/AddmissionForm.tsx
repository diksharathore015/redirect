"use client";
import React, { useState } from "react";
import HomepageForm from "./HomepageForm";

export default function AddmissionForm({ coursesData }) {
  const [list, setList] = useState<any>([]);
  const [showFlyOut, setShowFlyOut] = useState(false);

  return (
    <div className="   relative top-0   left-0 w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full top-0 left-0 z-[99]">
        <HomepageForm
          list={list}
          setList={setList}
          setShowFlyOut={setShowFlyOut}
          coursesData={coursesData}
        />{" "}
      </div>
    </div>
  );
}
