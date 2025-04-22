"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Loadmore({ getImages }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
// console.log("getImages?.nextgetImages?.nextgetImages?.next",getImages)
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    router.push(getImages?.next?.replace("http://127.0.0.1:8000", ""));
  };

  return (
    getImages?.next && (
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          className={`px-6 py-3 text-white font-semibold bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Loading...</span>
            </div>
          ) : (
            "Load More"
          )}
        </button>
      </div>
    )
  );
}
