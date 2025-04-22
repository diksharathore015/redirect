/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";

export default function AboutUs() {
  // State to track the scroll position
  const [scrollY, setScrollY] = useState<any>(0);

  // Track scroll position using useEffect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scrollY state on scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate opacity for the image and content
  const imageOpacity = Math.max(1 - scrollY / 500, 0); // Image fades out based on scrollY
  const contentOpacity = Math.min(scrollY / 500, 1); // Content fades in as you scroll

  return (
    <div className="  text-gray-900 bg-blue-50">
      {/* Parallax Header Section */}
      <header
        className="relative bg-blue-900 h-[80vh] text-white md:py-32 bg-cover bg-center transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: 'url("/blogs/1.jpg")',
          backgroundPositionY: `${scrollY * 0.5}px`, // Parallax effect based on scrollY
          opacity: imageOpacity, // Image fades out based on scroll
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-8xl tracking-tighter font-sans text-primary font-thin  ">
            Welcome to <br /> Royal Defence Academy
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary font-semibold ">
            Preparing future leaders for success in Defence exams through expert
            guidance and a holistic approach.
          </p>
        </div>
      </header>

      {/* Mission & Vision Section */}
      <section
        className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 transition-opacity duration-2000 ease-in-out"
        style={{
          opacity: contentOpacity, // Content fades in based on scroll
        }}
      >
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-blue-900">
              Our Mission
            </h2>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-800">
              At Royal Defence Academy, our mission is to provide the best
              coaching for aspiring candidates preparing for Defence exams. We
              focus on personal development, discipline, and academic excellence
              to build future leaders.
            </p>
          </div>

          {/* Mission, Vision, Core Values Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {/* Mission Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-medium text-blue-800 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700">
                To be recognized as the leading institute for Defence exam
                preparation, providing the best tools, strategies, and a
                nurturing environment for students to excel.
              </p>
            </div>

            {/* Core Values Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-medium text-blue-800 mb-4">
                Core Values
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Integrity</li>
                <li>Discipline</li>
                <li>Commitment to Excellence</li>
                <li>Student-Centered Approach</li>
                <li>Holistic Development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="bg-blue-50 md:py-16 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: Math.min(scrollY / 700, 1), // Team section fades in as you scroll further
        }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Meet Our Expert Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                className="w-full h-40 object-cover"
                src="https://via.placeholder.com/300"
                alt="Team Member"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">Chief Trainer</p>
                <p className="mt-2">
                  With over 10 years of experience in Defence coaching, John is
                  dedicated to providing the best training for aspiring cadets.
                </p>
              </div>
            </div>
            <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                className="w-full h-40 object-cover"
                src="https://via.placeholder.com/300"
                alt="Team Member"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Exam Strategist</p>
                <p className="mt-2">
                  Jane specializes in exam strategy and mentoring students to
                  understand complex Defence exam patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Royal Defence Academy. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
