"use server";
import axios from "axios";
export async function get(url: string) {
  try {
    const response = await axios.get(url); // Await the response
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function post(url: string, formData: FormData) {
  await axios
    .post(url, formData)
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

export async function patch(url: string, formData: FormData) {
  await axios
    .patch(url, formData)
    .then((response: any) => {
      // console.log("test response", response);
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}
export async function del(url: string) {
  await axios
    .delete(url)
    .then((response: any) => {
      // console.log("test response", response);
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

export async function getCoordinatesFromAddress(address: any) {
  const apiKey = "AIzaSyBN8B0eC4MQSfcbpob-MMX1FxP54sLZpI4";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data: any = await response.json();
    if (data.status === "OK") {
      const { lat, lng }: any = data.results[0].geometry.location;
      const radius = 500000;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=political&key=${apiKey}`;
      const response = await fetch(url);
      const data2 = await response.json();
      // console.log("testnearby", data2);

      return data2;
    } else {
      throw new Error(data.error_message || "Failed to fetch coordinates");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}
