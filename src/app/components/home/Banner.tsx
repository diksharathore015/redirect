"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLogoWhatsapp, BiPhone } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default function Banner({ data }: any) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [mainData, setData] = useState<any>(data);

  return (
    <div className="w-full  ">
      {mainData && (
        <Slider {...settings}>
          {mainData?.map((slide, index) => (
            <div key={index} className="relative w-full h-[18vh] md:h-[70vh]">
              {slide?.Image && (
                <Image
                  src={slide.Image}
                  alt={slide.image_alt || slide.title}
                  title={slide.image_alt || slide.title}
                  layout="fill"
                  className="object-cover bg-white w-full"
                  quality={30}
                />
              )}

              <div className="absolute  left-2 bottom-[18%] md:bottom-[28%] bg-gray-100 p-1 rounded-lg  flex flex-col items-center gap-1 md:gap-10 text-white text-sm sm:text-base md:text-lg">
                {slide?.facebook_link && (
                  <Link
                    hrefLang="en"
                    href={slide.facebook_link}
                    target="_blank"
                    className="flex items-center md:px-4 md:py-2 bg-blue-700 rounded hover:scale-105 transition-transform animate-pulse"
                  >
                    <FaFacebook className="md:w-7 md:h-7 w-5 h-5 p-1" />
                  </Link>
                )}
                {slide?.instagram_link && (
                  <Link
                    hrefLang="en"
                    href={slide.instagram_link}
                    target="_blank"
                    className="flex items-center  md:px-4 md:py-2 bg-red-700 rounded hover:scale-105 transition-transform animate-pulse"
                  >
                    <FaInstagram className="md:w-7 md:h-7 w-5 h-5 p-1" />
                  </Link>
                )}
                {slide?.contact_number && (
                  <Link
                    hrefLang="en"
                    href={`tel:${slide.contact_number}`}
                    target="_blank"
                    className="flex items-center  md:px-4 md:py-2 bg-green-700 rounded hover:scale-105 transition-transform animate-pulse"
                  >
                    <BiPhone className="md:w-7 md:h-7 w-5 h-5 p-1" />
                  </Link>
                )}
                {slide?.contact_number && (
                  <Link
                    hrefLang="en"
                    href={`https://wa.me/${slide.contact_number}`}
                    target="_blank"
                    className="flex items-center  md:px-4 md:py-2 bg-green-700 rounded hover:scale-105 transition-transform animate-pulse"
                  >
                    <BiLogoWhatsapp className="md:w-7 md:h-7 w-5 h-5 p-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
