"use client";
import { get, patch } from "@/actions/actions";
import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
export default function CityStateadd({ selectedCourse }: any) {
  const [citylist, setcityList] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const fetchStateSuggestions = async () => {
    const response = await get(`${Constants.allStates}`);
    // console.log("stateare", response);
    return response.map((item: any) => ({
      label: item.title,
      value: item.id,
    }));
  };

  //   const updatecourseState = () => {
  //     console.log(
  //       "Selected States:",
  //       selectedStates,
  //       selectedCourse,
  //       selectedCourse?.value
  //     );
  //     console.log("Selected Course:", selectedCourse.value);

  //     const id = selectedCourse.value;

  //     // Prepare the payload
  //     const payload: any = {
  //       title: selectedCourse?.label, // Include the title if needed
  //       city_ids: selectedStates, // Send all selected state IDs as a list
  //     };

  //     // Send a single PATCH request
  //     patch(`${Constants.courses}${id}/`, payload)
  //       .then((response) => {
  //         console.log("Update successful:", response);
  //       })
  //       .catch((error) => {
  //         console.error("Update failed:", error);
  //       });
  //   };
  const updatecourseState = () => {
    setLoading(true);
    
    const finalarr = [...selectedStates, ...selectedCourse.value.cities];
    
    const id = selectedCourse.value.id;

    // Prepare the payload
    if (selectedCourse) {
      const payload: any = {
        title: selectedCourse?.label, // Include the title if needed
        city_ids: finalarr, // Send all selected state IDs as a list
      };
          //   Send a single PATCH request
      patch(`${Constants.courses}${id}/`, payload)
        .then((response) => {
              setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    }
  };

  const fetchCitiesData = async (id: any) => {
    const controlller = new apiDataController();

    await controlller
      .GetApi(`${Constants.allCities}?state=${id}`)
      .then((res) => {
            setcityList(res);
      })
      .catch((err) => console.log("err", err));
  };
  const [selectedState, setSelectedState] = useState<any>();
  //   useEffect(() => {
  //     fetchCitiesData();
  //   }, [selectedState]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
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
      setSelectedStates(citylist.map((state) => state.id)); // ✅ Select all
    } else {
      setSelectedStates([]); // ✅ Deselect all
    }
  };
  return (
    <div>
      <div className="flex flex-col w-72">
        <label className="block uppercase text-sm font-medium text-gray-700 mb-1">
          States
        </label>
        <AsyncSelect
          cacheOptions
          loadOptions={fetchStateSuggestions}
          defaultOptions
          placeholder="Search states..."
          onChange={(e: any) => {
            setSelectedState(e.value);
            fetchCitiesData(e.value);
          }}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedStates.length === citylist?.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          Select All
        </label>
      </div>

      <div className="grid md:grid-cols-6 grid-cols-2">
        {citylist &&
          citylist.map((state: any) => (
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

      <button
        onClick={updatecourseState}
        className={`px-2 py-1 bg-blue-600 rounded-md text-white mt-4 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );
}
