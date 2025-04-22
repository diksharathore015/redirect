import Image from "next/image";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ISidebar {
  children: React.ReactNode; // More specific type for children
  showSidebar: boolean;
  setShowSidebar: any;
}

export default function Sidebar({
  children,
  showSidebar,
  setShowSidebar,
}: ISidebar) {
  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
  }, [showSidebar]);

  return (
    <>
      {showSidebar && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#000000ae] z-[9999]"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <div
        className={`flex flex-col justify-between top-0 right-0 w-full md:w-[30%] bg-white shadow-md fixed z-[9999] h-screen transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-scroll">{children}</div>
      </div>
    </>
  );
}
