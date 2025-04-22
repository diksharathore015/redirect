"use client";
import { store } from "@/store";
import { setShowForm } from "@/store/homepageSlice";
import { useEffect } from "react";

interface ISidebar {
  children: React.ReactNode;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void; // More specific type
}

export default function Popup({
  children,
  showSidebar,
  setShowSidebar,
}: ISidebar) {
  useEffect(() => {
    // Disable scroll when the popup is open
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
  }, [showSidebar]);

  return (
    <>
      {
        <div
          className={`fixed  top-0 left-0  transition-all  w-full h-screen  duration-700 ease-linear ${
            showSidebar
              ? "z-[9999] bg-[#000000ae] w-full h-screen opacity-100 backdrop-blur-lg  "
              : "z-[-9999]  overflow-hidden opacity-0 hidden"
          }  flex justify-end `}
          onClick={(e) => {
            e.stopPropagation();
            setShowSidebar(false);
             store.dispatch(setShowForm(false));
          }} // Close popup on background click
        >
          {/* Popup Content */}

          {children}
        </div>
      }
    </>
  );
}
