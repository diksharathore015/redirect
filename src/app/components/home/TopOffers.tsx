/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import Image from "next/image";
import React from "react";

const SocialMediaIcons = ({ data }: any) => {
  // console.log("SocialMediaIcons", data);
  return (
    <div className="fixed bottom-20 right-5 flex flex-col gap-4 z-50">
      <a
        href={data?.facebook_link}
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <Image
          src={require("../../../../public/socialmedia/icons8-facebook-circled.gif")}
          width={60}
          height={60}
          alt="img"
          className="rounded-full"
        />
      </a>
      <a
        href={data?.instagram_link}
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <Image
          src={require("../../../../public/socialmedia/icons8-instagram-logo.gif")}
          width={60}
          height={60}
          alt="img"
          className="rounded-full"
        />
      </a>
      <a href={`tel:${data?.contact_number}`} className="social-icon bg- ">
        <Image
          src={require("../../../../public/socialmedia/call.gif")}
          width={60}
          height={60}
          alt="img"
          className="rounded-full bg-white"
        />
      </a>
      <a
        target="_blank"
        href={`https://wa.me/${data?.contact_number}`}
        className="social-icon  "
      >
        <Image
          src={require("../../../../public/socialmedia/whatsapp.gif")}
          width={60}
          height={60}
          alt="img"
          className="rounded-full bg-white"
        />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
