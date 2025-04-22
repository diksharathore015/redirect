import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function SubCategoryCard({ data }: any) {
  // console.log("Subcategory data is", data);

  return (
    <div
      key={data.id}
      className="bg-white shadow rounded-lg p-4 flex flex-col justify-between w-full  "
    >
      {/* Image */}
      <img
        src={data.image}
        alt={data.image_alt}
        className="rounded-lg mb-4 h-40 w-full object-cover"
      />

      {/* Title */}
      <span className="text-lg font-bold text-primary">{data.title}</span>

      {/* Short Description */}
      <p className="text-gray-600 mt-2">{data.short_description}</p>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-2">{data.description}</p>

      {/* Price */}
      <p className="text-lg font-semibold text-green-500 mt-4">
        ₹{parseFloat(data.price).toLocaleString("en-IN")}
      </p>

      {/* Contact Button */}
      <div className="mt-4">
        <a
          href={`https://wa.me/${data?.contact_number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg block text-center"
        >
          Contact on WhatsApp
        </a>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-4 text-xl">
        {data.facebook_link && (
          <a
            href={data.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            <FaFacebook />
          </a>
        )}
        {data.instagram_link && (
          <a
            href={data.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <FaInstagram />
          </a>
        )}
        {data.youtube_link && (
          <a
            href={data.youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700"
          >
            <FaYoutube />
          </a>
        )}
      </div>
    </div>
  );
}
