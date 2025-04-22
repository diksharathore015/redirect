import Main from "@/app/components/courses/Main";
import { sanik_school_review } from "@/app/data/review";
import { AppAssets } from "@/Constants/assets";
import { Constants, fetchBaseUrl } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import Head from "next/head";

export const dynamic = "force-static";
// const Main = dynamic(() => import("@/app/components/courses/Main"));
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const parm = await params;
  const slug = await parm?.slug;
  const location = (await slug[1]) || "";
  const controller = new apiDataController();
  const course = await controller.getDataApi(
    `${Constants.singlecourses}?slug_field=${slug[0]}`
  );
  const baseURL = await fetchBaseUrl();
  const replaceLocation = (str: string) =>
    str?.replaceAll(/\{location\}/gi, location);

  // <link rel="canonical" href={`${baseURL}/${slug.join("/")}`} />;

  return (
    baseURL && {
      title: replaceLocation(course[0]?.meta_title) || "Royal defence Academy",
      description:
        replaceLocation(
          course[0]?.meta_description || course[0]?.description
        ) || "Royal defence Academy",
      keywords:
        replaceLocation(course[0]?.meta_keyword) || "Royal defence Academy",
      openGraph: {
        title:
          replaceLocation(course[0]?.meta_title) || "Royal defence Academy",
        url: `${baseURL}/${slug.join("/")}`,
        siteName: "Royal Defence Academy",
        type: "website",
        images: [
          {
            url: course[0]?.image,
            width: 1200,
            height: 630,
            alt:
              replaceLocation(course[0]?.image_alt) || "Royal Defence Academy",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          replaceLocation(course[0]?.meta_title) || "Royal defence Academy",
        description:
          replaceLocation(course[0]?.meta_description) ||
          "Royal defence Academy",
        images: [course[0]?.image],
      },
      alternates: {
        canonical: `${baseURL}/${slug.join("/")}`,
      },
      viewport: "width=device-width, initial-scale=1.0",
      robots: {
        index: true,
        follow: true,
      },
    }
  );
}
export const revalidate = 600;

export const dynamicParams = true; // or false, to 404 on unknown paths

// export async function generateStaticParams() {
//   const controller = new apiDataController();

//   try {
//     const courses = await controller.GetApi(Constants.courses);
//     return courses.flatMap((item: any) => [
//       {
//         slug: [item.slug_field], // Generate the slug parameter for each course
//       },
//     ]);
//   } catch (error) {
//     console.error("Error fetching data for static params:", error);
//   }
// }
export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const para = await params;
  const slug: any = para?.slug || [];
  const location = slug[1] || "";
  const controller = new apiDataController();
  const [course]: any = await controller.getDataApi(
    `${Constants.singlecourses}?slug_field=${slug[0].toLowerCase()}`
  );
  const baseURL = await fetchBaseUrl();
  // console.log("coursecourse", course);
  const faqs =
    course &&
    (await controller.getDataApi(`${Constants.faqsData}?course=${course?.id}`));

  const findMatchingState = () => {
    const matchedState = course?.states.find(
      (item) =>
        decodeURIComponent(item?.title.toLowerCase()).replace(" ", "") ===
        location
    );
    if (matchedState) return { type: "state", matchedItem: matchedState };
    const matchedCity =
      course &&
      course?.cities.find(
        (item) =>
          decodeURIComponent(item?.title.toLowerCase()).replace(" ", "") ===
          location
      );
    // if (matchedCity) return { type: "city", matchedItem: matchedCity };
    if (matchedCity) {
      // Find the state that corresponds to this city.
      // It is assumed that matchedCity.state holds the state ID.
      const correspondingState = course?.states.find(
        (state) => state.id === matchedCity.state
      );

      return {
        type: "city",
        matchedItem: matchedCity,
        stateName: correspondingState ? correspondingState.title : null,
      };
    }

    const matchedLocality = course?.localities.find(
      (item) =>
        decodeURIComponent(item?.title.toLowerCase())
          .replace(" ", "")
          .replace("%20", "") ===
        decodeURIComponent(
          location.toLowerCase().replace(" ", "").replace("%20", "")
        )
    );

    if (matchedLocality) {
      // Assume each locality object has a "city" property containing the city ID
      const correspondingCity = course.cities.find(
        (city) => city.id == matchedLocality.city
      );
      // console.log("correspondingCity", correspondingCity);
      // Then find the state corresponding to the found city
      const correspondingState = correspondingCity
        ? course?.states.find((state) => state.id === correspondingCity.id)
        : null;

      // console.log("correspondingstate", correspondingCity);
      return {
        type: "locality",
        matchedItem: matchedLocality,
        cityName: correspondingCity ? correspondingCity.title : null,
        stateName: correspondingState ? correspondingState.title : null,
      };
    }

    return {
      type: "none",
      matchedItem: matchedLocality || "india",
      cityName: "india",
      stateName: "india",
    }; // Return null if no match is found
  };
  const names = [
    "Royal Defence Online Academy",
    "Royal Sainik & Military School Coaching",
    "RIMC & RMS Online Coaching - Royal Defence",
    "Royal Defence Live Classes for Sainik & Military Schools",
    "Best Online Coaching for RMS, RIMC & Sainik Schools",
    "Royal Defence Academy – RIMC, RMS, Sainik School Prep",
    "Sainik & Military School Online Classes – Royal Defence",
    "RIMC, RMS & Sainik School Online Coaching Hub",
    "Royal Defence Live – Sainik, RMS, RIMC Coaching",
    "Sainik, Military, and RIMC Entrance Coaching Online",
    "Royal Defence Live Coaching",
    "RMS, RIMC, Sainik School Online Academy",
    "Royal Defence Academy Online",
    "Sainik & Military Entrance Online Classes",
    "RIMC & RMS Online Training by Royal Defence",
  ];
  const locationdata = findMatchingState();
  const locationId = locationdata?.matchedItem?.id || 0;
  const address = `${names[locationId % names.length]}${
    locationdata?.matchedItem?.title
      ? `, ${locationdata?.matchedItem?.title}`
      : ", India"
  } ${locationdata?.cityName || ""} ${locationdata?.stateName || ""} ${
    locationdata?.matchedItem?.pincode || ""
  }`;

  const servicesschema = {
    "@context": "https://schema.org",
    "@type": "Service",
    image: course?.image,
    name: `Royal Defence Academy - ${
      course?.meta_title.replaceAll(
        /\{location\}/gi,
        locationdata?.matchedItem?.title
      ) || "Royal defence academy"
    } `,
    url: `${baseURL}/${slug.join("/")}`,
    description:
      course?.meta_description.replaceAll(
        /\{location\}/gi,
        locationdata?.matchedItem?.title
      ) || "Royal defence academy",
    provider: {
      "@type": "Organization",
      name: "Royal Defence Academy",
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality:
          locationdata?.matchedItem.title || "4&10, C.B. Nagar, Khatipura,",
        addressRegion: locationdata?.stateName || "Jaipur",
        postalCode: locationdata?.matchedItem?.pincode || "302012",
        addressCountry: "India",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: course.contact_number,
        contactType: "Customer Service",
        openingHours: "Mo-Sa 08:00-20:00",
      },
    },
    areaServed: {
      "@type": "Place",
      name: locationdata?.matchedItem.title || "india",
    },
    keywords: course.meta_keyword
      .replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${locationdata?.matchedItem?.title || "india"}`
      )
      .split(","),
    additionalType: "https://schema.org/EducationalOrganization",
  };
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    image: course?.image || AppAssets.logo,
    "@id": `${baseURL}/${slug.join("/")}`,
    name: `Royal Defence Academy - ${
      course?.meta_title.replaceAll(
        /\{location\}/gi,
        locationdata?.matchedItem?.title
      ) || "Royal defence academy"
    } `,
    logo: course?.image,
    description:
      course?.meta_description.replaceAll(
        /\{location\}/gi,
        locationdata?.matchedItem?.title
      ) || "Royal defence academy",
    sameAs: [
      "https://www.youtube.com/@rdajaipur",
      "https://www.instagram.com/onlinesainikschoolcoaching/",
      "https://www.facebook.com/Sainikschoolentranceexamcoaching/",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality:
        locationdata?.matchedItem.title || "4&10, C.B. Nagar, Khatipura,",
      addressRegion: locationdata?.stateName || "Jaipur",
      postalCode: locationdata?.matchedItem?.pincode || "302012",
      addressCountry: "IN",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "705",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: locationdata?.matchedItem?.latitude,

      longitude: locationdata?.matchedItem?.logitude,
    },
    hasMap: "https://maps.app.goo.gl/ZtcDRKX59ZfUs62P6",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Booking & Support",
      telephone: course?.contact_number,
    },
    areaServed: { "@type": "Country", name: "India" },
    priceRange: "₹600-₹21000",
    keywords: course.meta_keyword
      .replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${locationdata?.matchedItem?.title || "india"}`
      )
      .split(","),
    url: `${baseURL}/${slug.join("/")}`,
    telephone: course?.contact_number,
    additionalType: "https://schema.org/EducationalOrganization",
    email: "royaldefenceacademyjaipur@gmail.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "8:00",
      closes: "20:00",
    },
  };

  const decodeStr = (str: string) =>
    decodeURIComponent(str?.toLowerCase().replace(/\s+/g, ""));

  const matchingState = (await course?.states
    .concat(course?.cities, course?.localities)
    .find((item: any) => decodeStr(item?.title) === decodeStr(location))) || {
    title: "India",
  };
  const reviewData = sanik_school_review?.slice(
    (locationdata?.matchedItem?.id || 0) % 91,
    ((locationdata?.matchedItem?.id || 0) % 91) + 10
  );
  const imagearr = course?.images.slice(
    0,
    Math.min(course?.images?.length || 0, 10)
  );
  const mappedReviews = reviewData?.map((review: any, i: any) => {
    return {
      //
      ...review,
      image: imagearr[i]?.image,

      reviewBody: review?.reviewBody
        .replaceAll("{location}", location)
        .replaceAll("{Location}", location),
    };
  });
  const loc = await controller.GetApi("http://ip-api.com/json/");
  const currentDate = new Date("04/02/2025");
  // console.log("matchingState", matchingState);
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name:
      course?.meta_title?.replaceAll(/\{location\}/gi, location) ||
      "Royal defence academy",
    url: `${baseURL}/${slug?.join("/")}`,

    image: course?.images?.map((img) => ({
      "@type": "ImageObject",
      url: img.image,
      caption: img?.meta_keyword.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        location || "india"
      ),
      width: 400, // Default width if not provided
      height: 400, // Default height if not provided
    })),
    description: course?.meta_description?.replaceAll(
      /(?:\{location\}|\{Location\})/g,
      `${
        locationdata?.matchedItem?.title
          ? locationdata?.matchedItem?.title
          : "india"
      }`
    ),
    courseWorkload: "4 hours per day",
    provider: {
      "@type": "Organization",
      name: "Royal Defence Academy",
      url: `${
        baseURL
          ? `${baseURL}/${slug?.join("/")}`
          : "https://militaryschoolscoaching.com"
      }/${slug?.join("/")}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "54",
    },
    review: mappedReviews,
    offers: {
      "@type": "Offer",
      category:
        course?.title?.replaceAll(/\{location\}/gi, location) ||
        "Royal defence academy",
      url: `${baseURL}/${slug?.join("/")}`,
      price: "Paid",
      priceCurrency: "₹",
    },
    keywords: course.meta_keyword
      .replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${locationdata?.matchedItem?.title || "india"}`
      )
      .split(","),
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name:
          course?.meta_title?.replaceAll(/\{location\}/gi, location) ||
          "Royal defence academy",
        description:
          course?.meta_keyword?.replaceAll(/\{location\}/gi, location) ||
          "Royal defence academy",
        instructor: {
          "@type": "Person",
          name: "Rajendra Singh Rathore",
        },
        location: {
          "@type": "Place",
          name: matchingState?.title || "Royal defence academy",
          address: {
            "@type": "PostalAddress",
            addressLocality: matchingState?.title || "india",
            addressRegion: matchingState?.title || "india",
          },
        },
        courseMode: "blended",
        courseWorkload: "PT288H",
        courseSchedule: {
          "@type": "Schedule",
          startDate: currentDate.toISOString().split("T")[0],
          endDate: new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            .toISOString()
            .split("T")[0],
          courseMode: "blended",
          scheduleTimezone: "Asia/Kolkata",
          repeatFrequency: "MONTHLY",
          repeatCount: 8,
        },
      },
    ],
    audience: [
      {
        "@type": "Audience",
        audienceType: `Students appearing for ${course?.short_title} `,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Royal Defence Academy",
      sameAs: `${baseURL}/${slug?.join("/")}`,
    },
  };

  const schemaData2 = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: course?.title.replaceAll(/(?:\{location\}|\{Location\})/g, ""),
    name: course?.title.replaceAll(/(?:\{location\}|\{Location\})/g, ""),
    description: course?.meta_description.replaceAll(
      /(?:\{location\}|\{Location\})/g,
      ""
    ),
    inLanguage: "en", // Replace with actual language if available
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: course?.image,
    },
    image: course?.multiple_imagess
      ?.slice(0, 10)
      .map((item: any) => item?.imagess),
    keywords: course.meta_keyword
      .replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${locationdata?.matchedItem?.title || "india"}`
      )
      .split(","),
  };
  const schemaData3 = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: course?.title.replaceAll(/(?:\{location\}|\{Location\})/g, ""),
    name: course?.title.replaceAll(/(?:\{location\}|\{Location\})/g, ""),
    description: course?.meta_description.replaceAll(
      /(?:\{location\}|\{Location\})/g,
      ""
    ),
    inLanguage: "en", // Replace with actual language if available
    image: course?.multiple_imagess?.slice(0, 30).map((item: any) => ({
      "@type": "ImageObject",
      url: item.imagess,
    })),
    author: {
      "@type": "Person",
      name: "Royal Defence Academy", // Replace with the author's name
      url: `${baseURL}/${slug?.join("/")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Royal Defence Academy", // Replace with your organization name
    },
    datePublished: currentDate.toISOString(), // Replace with actual datePublished
    dateModified: currentDate.toISOString(), // Replace with actual dateModified
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseURL}/${slug?.join("/")}` || `${baseURL}`,
      image: course?.images.map((item: any) => ({
        "@type": "ImageObject",
        url: item?.Image ?? item?.image ?? item?.imagess,
      })),
    },
    keywords: course.meta_keyword
      .replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${locationdata?.matchedItem?.title || "india"}`
      )
      .split(","),
  };
   
  const courseseodata = await fetch(`${Constants.coursesSeoData}`).then(
    (res) => {
      if (!res.ok) throw new Error("Failed to fetch  metadata");
      return res.json();
    }
  );
  return (
    baseURL && (
      <>
        <Head>
          <link rel="canonical" href={`${baseURL}/${slug.join("/")}`} />
        </Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData2) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData3) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesschema) }}
        />

        {!location &&
          course?.states.map((item: any, i: any) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name:
                  course?.short_title?.replaceAll(
                    /\{location\}/gi,
                    item?.title
                  ) || "Royal defence academy",
                description: course?.meta_description.replaceAll(
                  /\{location\}/gi,
                  item?.title
                ),
                url: `${baseURL}/${slug[0]}/${item?.title}`,
                image: item.Image,
                priceRange: "₹₹₹",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: item?.title || "India",
                  addressLocality: item?.title || "India",
                  addressRegion: item?.title || "India",

                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: item.latitude,
                  longitude: item.logitude,
                },
                telephone: item?.contact_number,
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "08:00",
                    closes: "20:00",
                  },
                ],
                review: {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Royal defence academy",
                    sameAs: [`${baseURL}/${slug[0]}/${item?.title}`],
                  },
                  reviewBody:
                    "The coaching provided by Royal Defence Academy is excellent. The faculty is highly experienced, and the environment is conducive to learning.",
                  datePublished: currentDate,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: 5,
                    bestRating: 5,
                    worstRating: 5,
                  },
                },
              })}
            </script>
          ))}
        {course?.cities
          .filter(
            (city: any) =>
              city.state ===
              course?.states.find(
                (state: any) =>
                  state.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
                  location.toLowerCase().replace(/[^a-z0-9]/g, "")
              )?.id
          )
          .map((item: any, i: any) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name:
                  course?.short_title?.replaceAll(
                    /\{location\}/gi,
                    item?.title
                  ) || "Royal defence academy",
                description: course?.meta_description.replaceAll(
                  /\{location\}/gi,
                  item?.title
                ),
                url: `${baseURL}/${slug[0]}/${item?.title}`,
                image: item.Image,
                priceRange: "₹₹₹",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: item?.title || "India",
                  addressLocality: item?.title || "India",
                  addressRegion: item?.title || "India",

                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: item.latitude,
                  longitude: item.logitude,
                },

                telephone: item?.contact_number,
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "08:00",
                    closes: "20:00",
                  },
                ],
                review: {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Royal defence academy",
                    sameAs: [`${baseURL}/${slug[0]}/${item?.title}`],
                  },
                  reviewBody:
                    "The coaching provided by Royal Defence Academy is excellent. The faculty is highly experienced, and the environment is conducive to learning.",
                  datePublished: currentDate,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: 5,
                    bestRating: 5,
                    worstRating: 5,
                  },
                },
              })}
            </script>
          ))}

        {course?.localities
          .filter(
            (local: any) =>
              local.city ===
              course?.cities.find(
                (city: any) =>
                  city.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
                  location.toLowerCase().replace(/[^a-z0-9]/g, "")
              )?.id
          )
          .map((item: any, i: any) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name:
                  course?.short_title?.replaceAll(
                    /\{location\}/gi,
                    item?.title
                  ) || "Royal defence academy",
                description: course?.meta_description.replaceAll(
                  /\{location\}/gi,
                  item?.title
                ),
                url: `${baseURL}/${slug[0]}/${item?.title}`,
                image: item?.Image,
                priceRange: "₹₹₹",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: item?.title || "India",
                  addressLocality: item?.title || "India",
                  addressRegion: item?.title || "India",

                  addressCountry: "IN",
                },
                // geo: {
                //   "@type": "GeoCoordinates",
                //   latitude: courseLoc.lat,
                //   longitude: courseLoc.lon,
                // },
                telephone: item?.contact_number || "+91-8769422006",
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "08:00",
                    closes: "20:00",
                  },
                ],
                review: {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Royal defence academy",
                    sameAs: [`${baseURL}/${slug[0]}/${item?.title}`],
                  },
                  reviewBody:
                    "The coaching provided by Royal Defence Academy is excellent. The faculty is highly experienced, and the environment is conducive to learning.",
                  datePublished: currentDate,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: 5,
                    bestRating: 5,
                    worstRating: 5,
                  },
                },
              })}
            </script>
          ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name:
              course?.title?.replaceAll(/\{location\}/gi, location) ||
              "Royal defence academy",
            description: course?.meta_description,
            url: `${baseURL}/${slug[0]}`,
            image: course?.image,
            priceRange: "₹₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: matchingState?.title || location || "India",
              addressLocality: location || "India",
              addressRegion: location || "India",
              postalCode: matchingState?.pincode || "110001",
              addressCountry: "IN",
            },
            // geo: {
            //   "@type": "GeoCoordinates",
            //   latitude: courseLoc.lat,
            //   longitude: courseLoc.lon,
            // },
            telephone: "+91-8769422006",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "20:00",
              },
            ],
            review: {
              "@type": "Review",
              author: {
                "@type": "Person",
                name: "Royal Defence Academy",
                sameAs: [`${baseURL}/${slug[0]}`],
              },
              reviewBody:
                "The coaching provided by Royal Defence Academy is excellent. The faculty is highly experienced, and the environment is conducive to learning.",
              datePublished: currentDate,
              reviewRating: {
                "@type": "Rating",
                ratingValue: 5,
                bestRating: 5,
                worstRating: 5,
              },
            },
          })}
        </script>

        {course && (
          <div className="pb-20">
            <Main
          baseURL={baseURL}
            coursepagemetatitle={courseseodata[0]?.meta_title}
            locationdatas={locationdata}
            faqs={faqs}
            data={course}
            params={para}
            loc={loc}
            currentDate={currentDate}
            matchinglocation={matchingState?.title || "india"}
            />
          </div>
        )}
      </>
    )
  );
}
