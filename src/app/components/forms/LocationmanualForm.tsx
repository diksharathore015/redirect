"use client";

import React, { useState, useCallback } from "react";
import TextInput from "../controls/TextInput";
import { Constants } from "@/Constants/urls";
import AsyncSelect from "react-select/async";
import { get } from "@/actions/actions";

export default function LocationManualForm({ formik, type }: any) {
  const [selectedState, setSelectedState] = useState<string | null>("");

  const fetchStateSuggestions = async () => {
    const response = await get(`${Constants.allStates}`);
    // console.log("stateare", response);
    return response.map((item: any) => ({
      label: item.title,
      value: item.id,
    }));
  };

  const fetchCitySuggestions = useCallback(
    async (inputValue?: string) => {
      if (!selectedState) return [];

      const response = await get(`${Constants.city}?state=${selectedState}`);
     
      return response.map((item: any) => ({
        label: item.title,
        value: item.id,
      }));
    },
    [selectedState]
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-row p-3 items-end justify-between gap-3 w-full bg-white"
    >
      {type === "states" ? (
        <TextInput
          label="State Name"
          name="state"
          placeholder="Enter State Name"
          error={formik.errors.state}
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      ) : (
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
              // console.log("eeeeeeeeeestate", e);
              setSelectedState(e.value);
              formik.setFieldValue("state_name", e.value);
            }}
          />
        </div>
      )}

      {type === "city" && (
        <TextInput
          label="City Name"
          name="title"
          placeholder="Enter city list comma seprated eg. jaipur,ajmer "
          error={formik.errors.title}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}
      {type === "locality" && (
        <div className="flex flex-col w-72">
          <label className="block uppercase text-sm font-medium text-gray-700 mb-1">
            Cities
          </label>
          <AsyncSelect
            key={selectedState} // Reset options when state changes
            cacheOptions
            loadOptions={fetchCitySuggestions}
            defaultOptions
            placeholder="Search cities..."
            onChange={(e: any) => {
              // console.log("testcity", e);
              formik.setFieldValue("city", e);
            }}
          />
        </div>
      )}

      {type === "locality" && (
        <TextInput
          label="locality Name"
          name="title"
          placeholder="Enter locality list comma seprated eg. jaipur,ajmer"
          error={formik.errors.title}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}

      <button
        type="submit"
        className="bg-blue-500 px-3 py-1.5 text-white rounded disabled:opacity-50"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
