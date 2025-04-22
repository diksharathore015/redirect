import React from "react";
import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

interface CourseTableProps {
  course: {
    title?: any;
    meta_title: string;
    short_description: string;
    rating?: string | number;
    contact_number?: string;
    address?: string;
  };
  currentLocation?: string;
  locationdatas?: any;
  newDate: string;
  startDate: string;
}

const CourseTable: React.FC<CourseTableProps> = ({
  course,
  currentLocation,
  locationdatas,
  newDate,
  startDate,
}) => {
  // console.log("coursecoursecoursecourse", course);
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

  const locationId = locationdatas?.matchedItem?.id || 0;
  const selectedCourseName = names[locationId % names.length];

  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${
    locationdatas?.matchedItem?.latitude || "26.933927084173696"
  },${locationdatas?.matchedItem?.logitude || "75.74766294048028"}`;

  return (
    <table className="table-auto w-full border-collapse  overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border p-3 text-left font-semibold text-sm sm:text-base">
            Attribute
          </th>
          <th className="border p-3 text-left font-semibold text-sm sm:text-base">
            Details
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Course Title
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            {course?.meta_title?.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              `${currentLocation || "india"}`
            ) ||
              course?.title?.replaceAll(
                /(?:\{location\}|\{Location\})/g,
                `${currentLocation || "india"}`
              )}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Description
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            {course?.short_description.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              `${currentLocation || "india"}`
            )}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Instructor
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Rajendra Singh Rathore
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Course Mode
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Blended
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Duration
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            24 hours per week
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Start Date
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            {startDate}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            End Date
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            {newDate}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Opening Hours
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Monday to Saturday: 8:00 AM - 8:00 PM
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Rating
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600 flex items-center">
            {course?.rating || "4.5"}
            {[1, 2, 3, 4].map((_, i) => (
              <BiSolidStar key={i} className="text-yellow-400" />
            ))}{" "}
            <BiSolidStarHalf className="text-yellow-400" />
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Contact Number
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            {course?.contact_number || "N/A"}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Location on Map
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            <a
              href={googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Google Maps
            </a>
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600">
            Address
          </td>
          <td className="border p-3 text-sm sm:text-gray-500 text-gray-600 capitalize">
            {selectedCourseName}{" "}
            {locationdatas?.matchedItem?.title
              ? `, ${locationdatas?.matchedItem?.title.replaceAll("-", " ")}`
              : "India"}{" "}
            {locationdatas?.cityName || ""},{" "}
            {`${
              locationdatas?.stateName ? `${locationdatas?.stateName}` : ""
            }` || ""}{" "}
            {locationdatas?.matchedItem?.pincode || ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CourseTable;
