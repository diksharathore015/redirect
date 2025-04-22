"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Tab {
  key: string; // Unique identifier for the tab
  label: string; // Label displayed on the tab
  content: React.ReactNode; // Content to render when the tab is active
}

interface TabsProps {
  tabs: Tab[]; // Array of tabs
  onTabChange?: (item: any) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const searchParams = useSearchParams();
  // console.log("wwwwww", searchParams.get("tab"));
  //   const [activeTab, setActiveTab] = useState<any>(searchParams.get("tab")); // Default to the first tab
  const router = useRouter();
  const activeTab = searchParams.get("tab") ?? tabs[0].key;

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              router.push(`/locations?tab=${tab.key}`);
            }}
            className={`px-4 py-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {/* <div className="p-4 border rounded">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div> */}
    </div>
  );
};

export default Tabs;
