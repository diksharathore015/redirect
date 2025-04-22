"use client";
import React, { useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { Constants } from "@/Constants/urls";
import { get, patch, post } from "@/actions/actions";
import apiDataController from "@/controllers/RequestController";
import CityStateadd from "./CityStateadd";
import LocalityCityadd from "./LocalityCityAdd";

export default function UpdateCourse({ data }: any) {
  // console.log("datadatadata", data);
  const controller = new apiDataController();

  // Fetch course suggestions for AsyncSelect
  const fetchCourseSuggestions = async () => {
    return data.map((item: any) => ({
      label: item.title,
      value: item,
    }));
  };

  const [states, setStates] = useState<any[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>();
  const [tab, setTab] = useState<any>("states");

  // Fetch states from API
  useEffect(() => {
    const fetchStates = async () => {
      const res = await controller.getDataApi(`${Constants.allStates}`);
      // console.log("Fetched states:", res);
      setStates(res);
    };

    fetchStates();
  }, [data]);

  // Handle individual checkbox changes
  const handleStateChange = (id: string, checked: boolean) => {
    setSelectedStates((prevSelectedStates) => {
      if (checked) {
        return [...prevSelectedStates, id]; // ✅ Add to the array
      } else {
        return prevSelectedStates.filter((stateId) => stateId !== id); // ✅ Remove from the array
      }
    });
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStates(states.map((state) => state.id)); // ✅ Select all
    } else {
      setSelectedStates([]); // ✅ Deselect all
    }
  };

  // Submit function
  const updatecourseState = () => {
   
    const finalarr = [...selectedStates, ...selectedCourse.value.states];
    // console.log("Selected Course:123", finalarr);

    const id = selectedCourse.value;

    // Prepare the payload
    const payload: any = {
      title: selectedCourse?.label, // Include the title if needed
      state_ids: finalarr, // Send all selected state IDs as a list
    };
    // console.log("payloadpayloadpayload", payload);
    // Send a single PATCH request
    patch(`${Constants.courses}${id}/`, payload)
      .then((response) => {
        // console.log("Update successful:", response);
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };
  const fetchStateSuggestions = async () => {
    const response = await get(`${Constants.allStates}`);
    return response.map((item: any) => ({
      label: item.title,
      value: item.id,
    }));
  };

  return (
    <div className="min-h-screen mx-4">
      <h2>Update Course</h2>
      <AsyncSelect
        cacheOptions
        loadOptions={fetchCourseSuggestions}
        defaultOptions
        placeholder="Search course..."
        onChange={(e: any) => {
          // console.log("Selected Course:Selected Course:", e);
          setSelectedCourse(e);
        }}
      />
      <div className="flex gap-3 border-b border-gray-200 mb-3">
        {["states", "city", "localities"].map((item) => (
          <button
            key={item}
            onClick={() => {
              setTab(item);
              // console.log("tab", tab);
            }}
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 uppercase ${
              tab === item
                ? "text-blue-600" // Active tab text color
                : "text-gray-500 hover:text-gray-700" // Inactive tab text color
            }`}
          >
            {item}
            {/* Active tab underline with animation */}
            {tab === item && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-underline"></span>
            )}
          </button>
        ))}
      </div>

      {/* Course Selection Dropdown */}

      {/* State Selection */}
      {tab == "states" && (
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedStates.length === states.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              Select All
            </label>
          </div>

          <div className="grid md:grid-cols-6 grid-cols-2">
            {states.map((state: any) => (
              <div key={state.id}>
                <label className="gap-2 my-4 uppercase">
                  <input
                    type="checkbox"
                    checked={selectedStates.includes(state.id)}
                    onChange={(e) =>
                      handleStateChange(state.id, e.target.checked)
                    }
                  />
                  {state.title}
                </label>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={updatecourseState}
            className="px-2 py-1 bg-blue-600 rounded-md text-white mt-4"
          >
            Submit
          </button>
        </div>
      )}
      {/* city */}
      {tab == "city" && <CityStateadd selectedCourse={selectedCourse} />}
      {/* locality */}
      {tab == "localities" && (
        <LocalityCityadd selectedCourse={selectedCourse} />
      )}
    </div>
  );
}
