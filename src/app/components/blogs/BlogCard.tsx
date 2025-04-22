"use client";
import Image from "next/image";
import React from "react";

export default function BlogCard({ blog, type = "blog" }: any) {
  return (
    <div
      onClick={() =>
        window.open(
          `/${type == "blog" ? "blogs" : "news"}/${blog.slug_field}`,
          "_blank"
        )
      }
      className="bg-white mb-3  hover:cursor-pointer hover:bg-gray-50  -lg  -md p-4 w-full"
    >
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          title={blog.title}
          width={300}
          height={300}
          className="w-full h-60 object-fill -md mb-4"
        />
      )}

      <h3 className="text-lg  mb-2 text-blue-800 capitalize font-roboto">
        {blog.title}
      </h3>
      <div className="text-sm text-gray-500 flex justify-between">
        <span>By {blog.author}</span>
        {/* <span>{blog.time}</span> */}
      </div>
    </div>
  );
}
