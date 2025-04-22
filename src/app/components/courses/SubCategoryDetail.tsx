"use client";
import Image from "next/image";
import { BiPhone } from "react-icons/bi";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Breadbrumbs from "../UI/Breadbrumbs";
import CourseTopSection from "./CourseTopSection";
import SubCategoryCard from "./SubCategoryCard";

const SubCategoryDetail = ({ course }) => {
  // console.log("firstcourse", course);
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Course Overview */}
      <div>
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadbrumbs />
        </div>

        {/* Top Section */}
        <CourseTopSection data={course} />
      </div>

      {/* Subcourses */}
      <h2 className="text-xl w-[95%] mx-auto font-bold text-primary mb-4  mt-4">
        Available Sub-Courses
      </h2>
      <div className="grid w-[95%] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.subcategories.map((sub) => (
          <SubCategoryCard key={sub.id} data={sub} />
        ))}
      </div>
    </div>
  );
};

export default SubCategoryDetail;
