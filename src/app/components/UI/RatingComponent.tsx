import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons

function RatingComponent() {
  const rating: any = (Math.random() * 0.5 + 4.5).toFixed(1); // Random rating between 4.5 and 5.0
  const ratingCount = Math.floor(Math.random() * 151 + 900); // Random count between 900 and 1050

  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // 1 half star if fractional part >= 0.5
  const emptyStars = 5 - fullStars - halfStar; // Remaining stars are empty

  return (
    <div className="flex items-center gap-2 my-1">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {halfStar === 1 && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </div>

      <span className="text-gray-600 text-sm ml-2">
        {rating} <span className="md:ml-1 text-xs">★</span> | {ratingCount}{" "}
        Ratings
      </span>
    </div>
  );
}

export default RatingComponent;
