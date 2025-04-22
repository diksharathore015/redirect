// // GalleryCard.tsx
// import React, { useState } from "react";
// import Image from "next/image";
// import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
// import { BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
// import Head from "next/head";

// type GalleryCardProps = {
//   image: string;
//   altText: string;
//   contactNumber: string;
//   whatsappLink: string;
//   facebookLink: string;
//   instagramLink: string;
//   youtubeLink: string;
//   blurDataURL?: string;
//   index: number;
//   title: string;
//   description: string;
// };

// const GalleryCard: React.FC<GalleryCardProps> = ({
//   image,
//   altText,
//   contactNumber,
//   whatsappLink,
//   facebookLink,
//   instagramLink,
//   youtubeLink,
//   blurDataURL,
//   index,
//   title,
//   description,
// }) => {
//   const [show, setShow] = useState<number | null>(null);

//   const handleMouseEnter = (index: number) => setShow(index);
//   const handleMouseLeave = () => setShow(null);

//   // Structured Data for the current image

//   return (
//     <div
//       key={index}
//       className="relative overflow-hidden -lg md:h-[300px] flex flex-col items-end justify-end"
//       onMouseEnter={() => handleMouseEnter(index)}
//       onMouseLeave={handleMouseLeave}
//     >
//       {image && (
//         <Image
//           title={
//             altText || title?.replaceAll(/(?:\{location\}|\{Location\})/g, "")
//           }
//           src={image}
//           alt={
//             altText || title?.replaceAll(/(?:\{location\}|\{Location\})/g, "")
//           }
//           width={180}
//           height={180}
//           className="  md:h-[300px] md:w-[300px] w-48 h-48  object-fill py-1  px-1 bg-gradient-to-r from-red-400 to-pink-500 transform transition duration-300 hover:scale-105"
//         />
//       )}
//       {show === index && (
//         <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-60  z-10 md:p-4">
//           <a
//             href={`tel:${contactNumber}`}
//             className="flex flex-col justify-center items-center md:items-center md:justify-center md:gap-2 cursor-pointer bg-green-600 md:mb-0 mb-1 md:p-3 md:text-2xl text-white md:font-bold  animate-pulse duration-75 ease-out  hover:scale-105 transition-transform  "
//             onClick={() => window.open(`tel:${contactNumber}`)}
//           >
//             <FaPhoneAlt className="md:black hidden" />
//             <label
//               htmlFor="phone"
//               className="cursor-pointer md:text-base text-sm"
//             >
//               {contactNumber}
//             </label>
//             <span className="md:black hidden">|</span>
//             <label
//               htmlFor="phone"
//               className="cursor-pointer md:text-base text-sm"
//             >
//               CALL NOW
//             </label>
//           </a>
//           <p className="text-xs font-semibold pt-1">
//             {description?.replaceAll(/(?:\{location\}|\{Location\})/g, "")}
//           </p>
//           <div className="flex   md:justify-around justify-between  md:px-0 px-1 ">
//             <a
//               href={
//                 "https://wa.me/+918619453001?text=Hey%20Royal%20Defence%20Academy%2C%20I%20want%20more%20information."
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <button className="bg-green-500 text-white py-1 md:mx-3 md:my-1 px-2 md:px-4  hover:bg-green-600">
//                 <BsWhatsapp />
//               </button>
//             </a>
//             <a href={facebookLink} target="_blank" rel="noopener noreferrer">
//               <button className="bg-blue-600 text-white py-1   px-2  md:px-4   hover:bg-blue-700">
//                 <FaFacebook />
//               </button>
//             </a>
//             <a href={instagramLink} target="_blank" rel="noopener noreferrer">
//               <button className="bg-pink-600 text-white py-1  px-2   md:px-4   hover:bg-pink-700">
//                 <BsInstagram />
//               </button>
//             </a>
//             <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
//               <button className="bg-red-600 text-white py-1  px-2   md:px-3   hover:bg-pink-700">
//                 <BsYoutube />
//               </button>
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GalleryCard;
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";

type GalleryCardProps = {
  image: string;
  altText: string;
  contactNumber: string;
  whatsappLink: string;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
  blurDataURL?: string;
  index: number;
  title: string;
  description: string;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  altText,
  contactNumber,
  whatsappLink,
  facebookLink,
  instagramLink,
  youtubeLink,
  index,
  title,
  description,
}) => {
  const [show, setShow] = useState<number | null>(null);

  const handleMouseEnter = () => setShow(index);
  const handleMouseLeave = () => setShow(null);

  // Precompute sanitized values
  const sanitizedTitle = useMemo(
    () => altText || title.replace(/(?:\{location\}|\{Location\})/g, ""),
    [altText, title]
  );

  const sanitizedDescription = useMemo(
    () => description.replace(/(?:\{location\}|\{Location\})/g, ""),
    [description]
  );

  return (
    <div
      className="relative overflow-hidden -lg md:h-[300px] w-full flex flex-col items-end justify-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {image && (
        <Image
          title={sanitizedTitle}
          src={image}
          alt={sanitizedTitle}
          width={140}
          height={140}
          className="md:h-[300px] md:w-[300px] w-full object-fill py-1 px-1  bg-white transform transition duration-300 hover:scale-105"
        />
      )}
      {show === index && (
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-60 z-10 md:p-4">
          <a
            href={`tel:${contactNumber}`}
            className="flex flex-col justify-center items-center md:gap-2 cursor-pointer bg-green-600 mb-1 md:mb-0 p-3 text-white font-bold animate-pulse  hover:scale-105 transition-transform"
          >
            <FaPhoneAlt className="hidden md:block" />
            <span className="md:text-base text-sm">{contactNumber}</span>
            <span className="hidden md:block">CALL NOW</span>
          </a>
          <p className="text-xs font-semibold pt-1">{sanitizedDescription}</p>
          <div className="flex justify-between px-1 md:px-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-1 px-2 md:px-4  hover:bg-green-600"
            >
              <BsWhatsapp />
            </a>
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-1 px-2 md:px-4  hover:bg-blue-700"
            >
              <FaFacebook />
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white py-1 px-2 md:px-4  hover:bg-pink-700"
            >
              <BsInstagram />
            </a>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white py-1 px-2 md:px-3  hover:bg-red-700"
            >
              <BsYoutube />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
