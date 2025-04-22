"use client";
import { useEffect, useState } from "react";
import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import { BiUser, BiEnvelope, BiPhone, BiMessage } from "react-icons/bi";
import { store, useAppSelector } from "@/store";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { setShowForm } from "@/store/homepageSlice";

export default function EnquiryForm({
  setShowFlyOut,
  coursesData,
  setShowSidebar = true,
  submit,
}: any) {
  const controller = new apiDataController();
  const [coursesdata, setCoursesData] = useState<any>(
    coursesData ? coursesData : ["1"]
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useAppSelector((state) => state.HomepageReducer.location);
  const [locationdata, setLocationData] = useState<any>();
  const pathname = usePathname();
  // console.log("pathnamepathname", pathname);
  const fetchCourse = async () => {
    try {
      const res = await controller.getDataApi(Constants.courses);
      setCoursesData(res);
    } catch (err) {
      console.log("Error fetching courses:", err);
    }
  };

  const loc = async () => {
    await controller.GetApi("http://ip-api.com/json/").then((res) => {
      setLocationData(res);
      // console.log("location", res);
    });
  };
  useEffect(() => {
    loc();
    if (!coursesData) fetchCourse();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const finalData: any = {
      states:
        locationdata?.regionName || location?.regionName || pathname || "NA",
      cities: locationdata?.city || "NA",
      type: list,
      message: "Call me",
      email: "verificationpending@test.com",
      ...data,
    };

    try {
      // console.log("Submitting data:", finalData);

      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      // Check if the response is valid JSON
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        const result = await response.json();
        setShowFlyOut(false);
        store.dispatch(setShowForm(false));
        setShowSidebar(false);
        submit();
        // console.log("API Response:", result);
      } else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      console.error("Error while submitting:", error.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [list, setList] = useState<any>([]);
  const handleChange = (option: any) => {
    setList((prevList) =>
      prevList.includes(option)
        ? prevList.filter((item) => item !== option)
        : [...prevList, option]
    );
  };

  return !isSubmitting ? (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-[90%] md:w-[55%] mx-auto md:mt-[6%] mt-20 bg-white -xl overflow-hidden  shadow-xl  transition-transform transform duration-800 "
    >
      <div className="w-full bg-blue-800 flex justify-between px-8 py-4">
        <span className="text-white md:text-2xl md:font-bold">
          Select the Exam You Need Guidance
        </span>
        {pathname !== "/contactus" && (
          <button
            onClick={() => {
              setShowSidebar(false);
              store.dispatch(setShowForm(false));
            }}
            className="bg-white text-gray-700 p-1  -full hover:bg-gray-200 transition duration-200"
          >
            <CgClose className="md:w-6 md:h-6 h-3 w-3" />
          </button>
        )}
      </div>

      {isSubmitted ? (
        <div className="flex items-center justify-center py-10">
          <div className="max-w-md w-full bg-green-100 text-center p-8 -lg shadow-lg animate-bounce">
            <h2 className="text-3xl text-green-600 font-semibold">
              Thank You!
            </h2>
            <p className="text-gray-700 mt-4">
              Your enquiry has been submitted successfully. We will get back to
              you soon!
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="px-8 py-5 space-y-3 md:space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choose Course
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coursesdata?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-start bg-gray-100 p-1 md:p-2 -lg cursor-pointer shadow-sm hover:bg-gray-200 transition-transform transform "
                >
                  <input
                    type="checkbox"
                    name="coaching"
                    value={option.id}
                    onChange={(e) => handleChange(e.target.value)}
                    className="form-checkbox text-blue-800 md:h-4 md:w-4 md:mt-0 mt-1.5"
                  />
                  <span className="ml-3 text-gray-800 capitalize md:text-sm text-xs">
                    {option?.short_title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="">
            <label className=" text-sm font-semibold text-gray-600   md:mb-2 flex items-center">
              <BiUser className="inline-block mr-2 " />
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full  p-1 border border-gray-300 -md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* <div>
            <label className="block md:text-lg  md:font-semibold text-gray-700 md:mb-2">
              <BiEnvelope className="inline-block mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full  md:p-3 p-1  border border-gray-300 -lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div> */}

          <div className="">
            <label className=" text-sm font-semibold text-gray-600 md:mb-2 flex items-center">
              <BiPhone className="inline-block mr-2 " />
              Phone
            </label>

            <input
              type="number"
              name="phone"
              className="w-full   p-1  border border-gray-300 -md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full duration-800 ease-linear bg-blue-800 text-white py-1 md:py-3 -lg shadow-md hover:shadow-lg transition-all hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600"
          >
            {isSubmitting ? "Submitting..." : "Send Enquiry"}
          </button>
        </form>
      )}
    </div>
  ) : (
    <div></div>
  );
}
