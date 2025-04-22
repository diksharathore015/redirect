import Link from "next/link";
import React from "react";

interface IButton {
  buttonText: any;
  handleClick?: () => void;
  underlineHover?: boolean;
  textStyle?: any;
  className?: any;
  link?: string;
}

export default function Button({
  buttonText,
  handleClick,
  underlineHover,
  textStyle,
  className,
  link,
}: IButton) {
  if (link) {
    return (
      <Link
        hrefLang="en"
        href={link}
        className={`font-lato rounded-sm ${className}`}
        style={{ textDecoration: "none" }}
      >
        <div className={`${underlineHover ? "group" : ""}`}>
          <p
            className={`${
              !underlineHover && "px-5"
            } font-lato flex items-center whitespace-nowrap justify-center text-center capitalize ${textStyle}`}
          >
            {buttonText}
          </p>
          {underlineHover && (
            <div className="border-b-2 border-buttonBg group-hover:w-full transition-all duration-300 ease-in-out w-8"></div>
          )}
        </div>
      </Link>
    );
  } else {
    return (
      <div className={`${underlineHover ? "group" : ""}`}>
        <button
          type="button"
          className={`font-lato rounded-sm ${
            underlineHover ? "" : "bg-buttonBg text-white"
          } ${className}`}
          onClick={handleClick}
        >
          <p
            className={`${
              !underlineHover && "px-5"
            } font-lato flex items-center whitespace-nowrap justify-center text-center capitalize ${textStyle}`}
          >
            {buttonText}
          </p>
        </button>
        {underlineHover && (
          <div className="border-b-2 border-buttonBg group-hover:w-full transition-all duration-300 ease-in-out w-8"></div>
        )}
      </div>
    );
  }
}
