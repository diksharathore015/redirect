"use client";
import { get, post } from "@/actions/actions";
import { Constants } from "@/Constants/urls";
import { useState } from "react";

import { useFormik } from "formik";
import LocationManualForm from "./LocationmanualForm";
import UpdateCourse from "../courses/UpdateCourse";
export default function Form({ data, slug, slugdata }: any) {
  // console.log("slugdata", slugdata);
  const [type, setType] = useState<any>("city");

  const apiKey: string = "AIzaSyBN8B0eC4MQSfcbpob-MMX1FxP54sLZpI4";
  function extractPincode(results: any) {
    for (let i = 0; i < results.length; i++) {
      const addressComponents = results[i].address_components;
      for (let j = 0; j < addressComponents.length; j++) {
        if (addressComponents[j].types.includes("postal_code")) {
          return addressComponents[j].long_name;
        }
      }
    }
    return null; // Return null if no pincode is found
  }
  const imageForm = {
    initialValues: {
      state: data?.state_name || "",
      city: "",
      lat: data?.lat || "",
      long: data?.long || "",
      pincode: data?.pincode || "",
      // file: data?.file || "",
    },

    onSubmit: async () => {
      // Handle states
      if (type == "states") {
        const stateNames = formik.values.state_name
          .split(",")
          .map((name: any) => name.trim()); // Split and trim state names

        for (const stateName of stateNames) {
          const formdata = new FormData();
          formdata.append("state_name", stateName);
          formdata.append("state", stateName);

          // Geocode logic for states
          if (!formik.values.lat) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              stateName
            )}&key=${apiKey}`;

            const geocodeResponse = await fetch(geocodeUrl);
            const geocodeData = await geocodeResponse.json();

            if (geocodeData.results?.[0]?.geometry?.location) {
              const { lat, lng } = geocodeData.results[0].geometry.location;

              formdata.append("lat", lat);
              formdata.append("long", lng);

              const pincodeResponse = await get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
              );
              // console.log("pincodeResponse", pincodeResponse);

              const pincode = extractPincode(pincodeResponse.results);
              if (pincode) {
                formdata.append("pincode", pincode);
              }
            } else {
              console?.error(
                `Failed to fetch geocode data for state: ${stateName}`
              );
              continue; // Skip this iteration if geocode data is invalid
            }
          } else {
            formdata.append("lat", formik.values.lat);
            formdata.append("long", formik.values.long);
            formdata.append("pincode", formik.values.pincode);
          }

          try {
            const response = await post(Constants.statesData, formdata); // Replace with your API endpoint for states
            // console.log(
            //   `Successfully uploaded data for state: ${stateName}`,
            //   response
            // );
          } catch (error) {
            console?.error(
              `Error uploading data for state: ${stateName}`,
              error
            );
          }
        }
      }
      if (type == "city") {
        const cityNames = formik.values.title
          .split(",")
          .map((name: any) => name.trim()); // Split and trim city names

        for (const cityName of cityNames) {
          const formdata = new FormData();
          formdata.append("title", cityName);
          formdata.append("state", formik.values.state_name); // Assuming a single state name is provided for cities

          if (!formik.values.lat) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              `${cityName}, ${formik.values.state_name}`
            )}&key=${apiKey}`;

            const geocodeResponse = await fetch(geocodeUrl);
            const geocodeData = await geocodeResponse.json();

            if (geocodeData.results?.[0]?.geometry?.location) {
              const { lat, lng } = geocodeData.results[0].geometry.location;

              formdata.append("latitude", lat);
              formdata.append("logitude", lng);

              const pincodeResponse = await get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
              );
              // console.log("pincodeResponse", pincodeResponse);

              const pincode = extractPincode(pincodeResponse.results);
              if (pincode) {
                formdata.append("pincode", pincode);
              }
            } else {
              console?.error(
                `Failed to fetch geocode data for city: ${cityName}`
              );
              continue; // Skip this iteration if geocode data is invalid
            }
          } else {
            formdata.append("lat", formik.values.lat);
            formdata.append("long", formik.values.long);
            formdata.append("pincode", formik.values.pincode);
          }

          try {
            const response = await post(Constants.city, formdata); // Replace with your API endpoint for cities
            // console.log(
            //   `Successfully uploaded data for city: ${cityName}`,
            //   response
            // );
          } catch (error) {
            console?.error(`Error uploading data for city: ${cityName}`, error);
          }
        }
      }

      if (type === "locality") {
        // console.log("localityformvalues are", formik.values);

        const localityNames = formik.values.title
          .split(",")
          .map((name: any) => name.trim()); // Split and trim locality names

        for (const localityName of localityNames) {
          // console.log("Processing locality:", localityName);

          const formdata = new FormData();
          formdata.append("title", localityName);
          formdata.append("city", formik.values.city?.value);
          try {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              `${localityName},${formik.values.city?.label} `
            )}&key=${apiKey}`;
            const geocodeResponse = await fetch(geocodeUrl);
            const geocodeData = await geocodeResponse.json();

            if (!geocodeData.results.length) {
              console.error(`No geocode data found for ${localityName}`);
              continue;
            }

            const { lat, lng } = geocodeData.results[0].geometry.location;
            // console.log(
            //   `Coordinates for ${localityName}: Latitude - ${lat}, Longitude - ${lng}`
            // );

            formdata.append("latitude", lat); // ✅ Using correct lat
            formdata.append("logitude", lng); // ✅ Fixed typo

            // Fetch Pincode
            const pincodeResponse = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
            );
            const pincodeData = await pincodeResponse.json();

            const pincode = extractPincode(pincodeData.results);
            if (pincode) {
              formdata.append("pincode", pincode);
            }

            // Upload Data
            const response = await post(Constants.localitites, formdata);
            // console.log(
            //   `✅ Successfully uploaded data for locality: ${localityName}`,
            //   response
            // );
          } catch (error) {
            console.error(
              `❌ Error processing locality: ${localityName}`,
              error
            );
          }
        }
      }
    },

    enableReinitialize: true,
  };
  const formik: any = useFormik(imageForm);
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === "Royal565656") {
      setAccessGranted(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };
  return (
    <>
      {!accessGranted ? (
        <div className="h-screen justify-center items-center flex">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            className="border p-2 "
          />
          <button
            onClick={handlePasswordSubmit}
            className="bg-blue-500 text-white p-2"
          >
            Submit
          </button>
        </div>
      ) : slug == "update" ? (
        <div>
          <UpdateCourse data={slugdata} />
        </div>
      ) : (
        <div className="relative  ">
          <div className="w-full max-w-md mx-auto">
            <div className="flex gap-3 bg-gray-100 p-2 rounded-lg">
              {["city", "locality"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    type === item
                      ? "bg-blue-500 text-white shadow"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-200 rounded-md  my-4 p-2">
            <h3 className="text-lg font-bold mb-4">Add New {type}</h3>
            <LocationManualForm formik={formik} type={type} />
          </div>
        </div>
      )}
    </>
  );
}
