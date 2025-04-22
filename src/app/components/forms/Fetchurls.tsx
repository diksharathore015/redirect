"use client";
import React from "react";

export default function Fetchurls({ urls }: any) {
  // console.log("testurlsare", urls);
  const openURLs = (urls: any[]) => {
    // console.log("button hit", urls);
    let index = 0;

    const interval = setInterval(() => {
      if (index >= urls.length) {
        clearInterval(interval);
        return;
      }
      const { url } = urls[index];
      window.open(url, "__blank"); // Corrected "_blank"
      index++;
    }, 5000); // Opens one URL every 500ms
  };
  return (
    <div className="overflow-y-auto">
      <button
        onClick={() => openURLs(urls)}
        className="bg-blue-800 text-white capitalize rounded-lg text-3xl px-4 py-2"
      >
        Open URLS
      </button>
      {urls && urls.map((item: any, i: any) => <h1 key={i}>{item.url}</h1>)}
    </div>
  );
}
