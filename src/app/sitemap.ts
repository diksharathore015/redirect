import { Constants, fetchBaseUrl } from '@/Constants/urls';
import apiDataController from '@/controllers/RequestController';
import type { MetadataRoute } from 'next';
export const revalidate = 600; 
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 
  const controller = new apiDataController();
  const blogsData = await controller.getDataApi(`${Constants.blogsSlug}`);
  const newsData = await controller.getDataApi(`${Constants.news}`);
  const courseData = await controller.getDataApi(`${Constants.singlecourses}`);
  // console.log("testcoursedata2" ,courseData)
   const baseURL = await fetchBaseUrl();
  const blogSiteurl = blogsData.map((item: any) => ({
    url: `${baseURL}/blogs/${item?.slug_field}`,
    lastModified:  new Date("04/02/2025"),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));
  // const newsSitemap = newsData.map((item: any) => ({
  //   url: `${baseURL}news?news=${item?.slug_field}`,
  //   lastModified:  new Date("04/02/2025"),
  //   changeFrequency: 'weekly',
  //   priority: 0.9,
  // }));
  const newsSiteurl = newsData.map((item: any) => ({
    url: `${baseURL}/news/${item?.slug_field}`,
    lastModified:  new Date("04/02/2025"),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));


  // const blogsSitemap = blogsData.map((item: any) => ({
  //   url: `${baseURL}blogs?blog=${item?.slug_field}`,
  //   lastModified:  new Date("04/02/2025"),
  //   changeFrequency: 'weekly',
  //   priority: 0.9,
  // }));

  const coursesSitemap = courseData.flatMap((item: any) => {
    if (!item?.slug_field) {
      console.error("Missing slug_field in course:", item);
      return [];
    }  
    const urls = [
      {
        url: `${baseURL}/course`,
        lastModified:  new Date("04/02/2025"),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseURL}/${item?.slug_field}`,
        lastModified:  new Date("04/02/2025"),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseURL}/aboutus`,
        lastModified:  new Date("04/02/2025"),
        changeFrequency: "weekly",
        priority: 0.9,
      },

      
    ];
    
    const stateUrls =
      item?.states?.map((state: any) => ({
        url: `${baseURL}/${item?.slug_field}/${state?.title}`,
        lastModified:  new Date("04/02/2025"),
        changeFrequency: "weekly",
        priority: 0.9,
      })) || [];
  
    const cityUrls = item?.cities?.map((city: any) => ({
        url: `${baseURL}/${item?.slug_field}/${city?.title}`,
        lastModified:  new Date("04/02/2025"),
        changeFrequency: "weekly",
        priority: 0.9,
      })) || [];
      const localityUrls = item?.localities?.map((localities: any) => ({
        url: `${baseURL}/${item?.slug_field}/${localities?.title}`,
        lastModified:  new Date("04/02/2025"),
        changeFrequency: "weekly",
        priority: 0.9,
      })) || [];
      // localities
 
    return [...urls, ...stateUrls, ...cityUrls ,...localityUrls , ...blogSiteurl , ...newsSiteurl];
  });
  
//  console.log("test12123",courseData[1]?.cities)
// Static routes (including homepage)
  const staticRoutes = [
    {
      url: baseURL,
      lastModified:  new Date("04/02/2025"),
      changeFrequency: 'weekly',
      priority: 1.0, 
    },
    // ... other static routes (if any)
  ];
 

  // Combine static and dynamic routes
  return [...staticRoutes,   ...coursesSitemap,  ];
}
