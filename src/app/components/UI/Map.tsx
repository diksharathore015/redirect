import React from "react";

// Set container styles
const containerStyle = {
  width: "100%",
  height: "300px",
};

// Map component
const Map = ({ latitude, longitude }) => {
  // Your Google Maps API Key
  // const apiKey = "AIzaSyCMdS0mzMF3mT9NCLFZBURQAZlYzHLxwCk";
  // console.log("Latitude:....", latitude, longitude);

  // Load the Google Maps script
  // const { isLoaded } = useLoadScript({
  //   // googleMapsApiKey: apiKey,
  // });

  // Debugging: Check latitude and longitude
  // console.log("Latitude:", latitude, "Longitude:", longitude);

  // Validate latitude and longitude
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return <div>Error: Invalid latitude or longitude.</div>;
  }

  // if (!isLoaded) return <div>Loading...</div>;

  return <div></div>;
};

export default Map;
