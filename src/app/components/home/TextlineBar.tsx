"use client";
import Head from "next/head";
import { BsDot } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";

function CustomPrevArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white text-blue-800 p-2 rounded-full shadow hover:bg-blue-100 transition duration-300 z-10"
    >
      <FaChevronLeft size={16} />
    </button>
  );
}

function CustomNextArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white text-blue-800 p-2 rounded-full shadow hover:bg-blue-100 transition duration-300 z-10"
    >
      <FaChevronRight size={16} />
    </button>
  );
}
export default function LineSlider({ data }: any) {
  const settings = {
    dots: true,

    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-2 h-[3px] bg-white rounded-lg hover:bg-blue-600 "></div>
    ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {data.map((item: any, i: any) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: item?.title,
              url: item?.link,
              description: `A link to ${item?.title}`,
              mainEntityOfPage: item?.link,
              publisher: {
                "@type": "Organization",
                name: "Royal Defence Academy",
              },
            }),
          }}
        />
      ))}

      <div className=" md:py-16 mt-8 py-5 md:mt-20 bg-blue-800 p-4  md:px-10   overflow-hidden">
        <Slider {...settings}>
          {data.map((item: any, i: any) => (
            <div
              key={i}
              className="md:p-6 bg-transparent rounded-lg transform transition-all hover:shadow-xl"
            >
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: item?.title,
                    url: item?.link,
                    description: `A link to ${item?.title}`,
                    mainEntityOfPage: item?.link,
                    publisher: {
                      "@type": "Organization",
                      name: "Royal Defence Academy",
                    },
                  }),
                }}
              />
              <div className="text-center">
                <a
                  href={item?.link}
                  className="md:text-xl  text-white font-Montserrat capitalize hover:text-blue-600 transition-all duration-300 block tracking-tight leading-snug hover:underline"
                >
                  {item?.title}
                </a>
                <p className="mt-2 text-white text-sm">
                  Click to explore more about{" "}
                  <span className="font-medium">{item?.title}</span>.
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
