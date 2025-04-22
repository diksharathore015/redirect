/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">
        Oops! The page you are looking for does not exist.
      </p>
      <a
       
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go back to Home
      </a>
    </div>
  );
}
