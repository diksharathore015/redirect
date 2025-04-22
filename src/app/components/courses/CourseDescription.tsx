"use client";
import React, { useState } from "react";
import RawHtmlRenderer from "../UI/RawHtmlRendererProps";
interface DescriptionProps {
  description: string;
  currentLocation: any;
}

const CourseDescription: React.FC<DescriptionProps> = ({
  description,
  currentLocation,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    if (count == 450) {
      setcount(10000000000);
    } else {
      setcount(450);
    }
  };
  const [count, setcount] = useState<any>(450);
  return (
    <div className="  mx-auto">
      <div
        onClick={handleToggle}
        className={`${
          isExpanded ? "line-clamp-none" : "line-clamp-6"
        }  transition-all duration-300`}
      >
        <RawHtmlRenderer
          htmlContent={description}
          currentLocation={currentLocation}
        />
      </div>
     
    </div>
  );
};

export default CourseDescription;
