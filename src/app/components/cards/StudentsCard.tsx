// components/StudentsCard.js
import Image from "next/image";

const StudentsCard = ({ data }) => {
  return (
    <div className="flex flex-col items-center w-full ">
      <div className="w-36 h-36  bg-green-100 flex items-center justify-center">
        {data.Image && (
          <Image
            title={data.image_alt || "img"}
            src={data.Image}
            alt={data.image_alt || "img"}
            width={120} // Adjust width based on your image size
            height={120} // Adjust height based on your image size
            className="object-cover "
          />
        )}
      </div>
      <p className="mt-2 text-center text-primary font-medium">{data.title}</p>
    </div>
  );
};

export default StudentsCard;
