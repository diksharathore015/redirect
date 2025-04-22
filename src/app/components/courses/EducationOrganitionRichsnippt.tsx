"use client";
import { fetchBaseUrl } from "@/Constants/urls";
import React from "react";

export default function OrganitionRichsnippt({
  pathSegments,
  imagearr,
  data,
  locality,
  pathname,
  title,
  date,
}: any) {
   const baseURL =  fetchBaseUrl();
  const url = `${baseURL}/${pathname}`;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Royal Defence Academy",
          description: data.meta_description,
          url: url,
          image: data.image,
          priceRange: "₹₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: locality,
            addressLocality: pathSegments[pathname.length - 1],
            addressRegion: pathSegments[pathname.length - 2],

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
              name: "Royal defence academy",
              sameAs: [url],
            },
            reviewBody:
              "The coaching provided by Royal Defence Academy is excellent. The faculty is highly experienced, and the environment is conducive to learning.",
            datePublished: date,
            reviewRating: {
              "@type": "Rating",
              ratingValue: 5,
              bestRating: 5,
              worstRating: 5,
            },
          },
        })}
      </script>
    </>
  );
}
