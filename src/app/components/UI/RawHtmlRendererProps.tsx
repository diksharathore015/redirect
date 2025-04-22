"use client";
import React from "react";

interface RawHtmlRendererProps {
  htmlContent: string;
  currentLocation?: any;
}

const RawHtmlRenderer: React.FC<RawHtmlRendererProps> = ({
  htmlContent,
  currentLocation,
}) => {
  return (
    htmlContent && (
      <div
        className="raw-html-container "
        dangerouslySetInnerHTML={{
          __html: htmlContent?.replaceAll(
            "{location}",
            currentLocation ? decodeURIComponent(currentLocation) : ""
          ),
        }}
      />
    )
  );
};

export default RawHtmlRenderer;
