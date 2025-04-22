"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const BlogDetail = ({ blog }: any) => {
  const pathname = usePathname();

  // Precompute URL based on the current path for efficiency
  const blogUrl = `/${
    pathname.includes("news")
      ? `news/${blog.slug_field}`
      : `blogs/${blog.slug_field}`
  }`;

  return (
    <Link
      hrefLang="en"
      key={blog.id}
      className="cursor-pointer p-4 shadow-lg border-t rounded-md transition-transform transform hover:scale-105 hover:shadow-md block"
      href={blogUrl}
      target="__blank"
    >
      <div className="flex gap-4 items-start">
        {blog.image && (
          <div className="w-[40%] flex-shrink-0">
            <Image
              title={blog.title ?? "Image"}
              src={blog.image}
              alt={blog.title ?? "Image"}
              width={140}
              height={140}
              className="rounded-lg object-cover mt-1 w-full h-full"
              // Optimize loading by marking the image as high priority
            />
          </div>
        )}
        <div className="w-[60%]">
          <h3 className="text-xl font-semibold text-gray-800 leading-6 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {blog.short_description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogDetail;
