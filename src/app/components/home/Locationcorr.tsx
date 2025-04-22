"use client"

import { useEffect, useState } from "react";


interface Coordinates {
  latitude: number;
  longitude: number;
}

const UserLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {coordinates ? (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default UserLocation;
