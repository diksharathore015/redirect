// components/Footer.js
"use client";
import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const Footer = ({
  address,
  contact_number,
  whatsapp_number,
  location,
}: any) => {
  return (
    <footer className="bg-blue-800 text-white py-10 overflow-hidden">
      <div className="container mx-auto px-4 md:flex md:justify-between">
        {/* Logo & Description */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold font-Cormorant">
            Royal Defence Acedemy
          </h2>
          <p className="mt-2 text-sm text-white md:pr-20">
            Empowering students with a strong foundation and the skills needed
            for lifelong success.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-xl font-semibold  font-Cormorant">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                hrefLang="en"
                href="/aboutus"
                className="hover:underline text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                hrefLang="en"
                href="/course"
                className="hover:underline text-white"
              >
                Admissions
              </Link>
            </li>
            <li>
              <Link
                hrefLang="en"
                href="/course"
                className="hover:underline text-white"
              >
                Academics
              </Link>
            </li>
            <li>
              <Link
                hrefLang="en"
                href="/contactus"
                className="hover:underline text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="md:w-1/3 flex flex-col">
          <h3 className="text-xl font-semibold   font-Cormorant">Contact Us</h3>
          <label className="mt-4 text-white">Address :{address}</label>
          <a
            href={`tel:${contact_number}`}
            target="_black"
            className="mt-2 text-white underline flex items-start gap-2"
          >
            <FaPhoneAlt className="text-blue-500 w-4 h-4 mt-1" />
            <span>Phone: {contact_number}</span>
          </a>

          {/* Whatsapp */}
          <a
            href={`https://wa.me/${whatsapp_number}`}
            target="_black"
            className="mt-2 text-white underline flex items-start gap-2 hover:cursor-pointer"
          >
            <FaWhatsapp className="text-green-500 w-4 h-4 mt-1" />
            <span>Whatsapp: {whatsapp_number}</span>
          </a>

          {/* Location */}
          <a
            href={location}
            target="_black"
            className="mt-2 text-white hover:cursor-pointer flex items-start gap-2"
          >
            <FaMapMarkerAlt className="text-red-500 w-4 h-4 mt-1" />
            <label className=" hover:cursor-pointer">
              Location: {location?.substring(0, 20)}
            </label>
          </a>
          {/* Social Media Links */}
          <div className="mt-4 flex space-x-4">
            <Link
              hrefLang="en"
              href="https://www.facebook.com"
              target="_blank"
              className="text-white hover:text-white"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              hrefLang="en"
              href="https://www.twitter.com"
              target="_blank"
              className="text-white hover:text-white"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              hrefLang="en"
              href="https://www.instagram.com"
              target="_blank"
              className="text-white hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-white pt-4 text-center text-white">
        <p>
          &copy; {new Date("04/02/2025").getFullYear()} Royal Defence Academy.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
