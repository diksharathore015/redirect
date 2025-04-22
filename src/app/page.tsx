import { Constants, fetchBaseUrl } from "@/Constants/urls";
 
// import Banner from "./components/home/Banner";
// import Blogs from "./components/home/Blogs";
// import FeatureCourses from "./components/home/FeatureCources";
// import StudyLocation from "./components/home/StudyLocation";
// import CitiesLocation from "./components/home/TopCities";
// import TopStudents from "./components/home/TopStudents";
// import LineSlider from "./components/home/TextlineBar";

// export const dynamic = "force-dynamic"; // Ensure the page is SSR only

 



export default async function Home() {

  // const loc = await controller.GetApi("http://ip-api.com/json/");
  // console.log("seoDataseoData", seoData[0].logo);
  const baseURL = await fetchBaseUrl();

 

  return (
    <>
   
      {/* {<MainForm coursesData={coursesData} />} */}

   <div>test</div>
    </>
  );
}
