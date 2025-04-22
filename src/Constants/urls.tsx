import { get } from "@/actions/actions";

export async function fetchBaseUrl() {
  try {
    const response = await get(`${Constants.API_URL}urls/`); // Replace with your endpoint
    const data = await response[0]?.url;
    return data; // Assuming API returns { url: "http://example.com" }
  } catch (error) {
    console.error("Error fetching base URL:", error);
  }
}
export class Constants {
  static API_URL = "http://43.204.144.192:8000/";
  // static API_URL = "http://127.0.0.1:8000/";
  static X_API_KEY: "X API Key";
  static url = `${this.API_URL}urls/`
  static bannerData = `${this.API_URL}banners/`;
  static studentsData = `${this.API_URL}topscrollers/`;
  static linescrollBarData = `${this.API_URL}linescrollbar/`;
  static homepageimages = `${this.API_URL}homepageimages/`;
  static courses = `${this.API_URL}courses/`;
  static singlecourses = `${this.API_URL}single-courses/`;
  static homepageCourses = `${this.API_URL}homepage-courses/`;
  static homepagefeaturecourses = `${this.API_URL}homepage-feature-courses/`;
  static homePageBlogs = `${this.API_URL}homePageBlogsData/?limit=6`;
  static blogs = `${this.API_URL}blogsData/`;
  static allblogs = `${this.API_URL}allblogs/`;

  static blogsSlug = `${this.API_URL}blogslugs/`;
  static news = `${this.API_URL}news/`;
  static seo = `${this.API_URL}seo/`;
  static statesData = `${this.API_URL}state/states/`;
  static homePageCities = `${this.API_URL}cities-with-courses/`;
  static homePageStates = `${this.API_URL}states-with-courses/`;
  static allStates = `${this.API_URL}cities/statesdetails/`;
  static allCities = `${this.API_URL}cities/allCities/`;
  static enquiryForm = `${this.API_URL}enquiry/`;
  static coursesSeoData = `${this.API_URL}courses-seo-data/`;
  static faqsData = `${this.API_URL}faqs/`;
  static homepagecontent = `${this.API_URL}homepagecontent/`;
  static coursesSlug = `${this.API_URL}courses-slug/`;
  static subCourse = `${this.API_URL}sub-courses/`;
  static geoLocation = `https://api.opencagedata.com/geocode/v1/json?q=`;
  static city = `${this.API_URL}cities/cities/`;
  static localitites = `${this.API_URL}cities/localitites/`;
  static headerCourses = `${this.API_URL}header-courses/`;
}
