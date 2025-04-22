"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Blogs = ({ data }: any) => {
  // console.log("mainblogs", data);
  const router = useRouter();

  return (
    <>
      <div className="mt-20  px-2 ">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center font-Montserrat italic capitalize   text-blue-800">
          Popular Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((blog: any, id: any) => (
            <div
              onClick={() =>
                window.open(`/blogs/${blog?.slug_field}`, "_blank")
              }
              key={id}
              className="bg-white mb-3 hover:cursor-pointer hover:bg-gray-50  p-4 w-full"
            >
              {blog?.image && (
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  title={blog?.title}
                  width={200}
                  height={200}
                  className="w-full h-60 object-fill -md mb-4"
                />
              )}

              <h3 className="text-lg font-semibold mb-2 text-blue-800 capitalize font-roboto">
                {blog?.title}
              </h3>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>By {blog?.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/blogs")}
            className="bg-blue-900 text-white px-6 py-2 text-lg font-medium hover:bg-gray-700 transition"
          >
            View All Blogs
          </button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
