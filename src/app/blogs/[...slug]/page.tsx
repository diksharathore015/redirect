import BlogsMain from "@/app/components/blogs/BlogsMain";
import { Constants, fetchBaseUrl } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
// import { store } from "@/store";
// import { setHomepageTitle } from "@/store/homepageSlice";
export const dynamic = "force-static";
export const revalidate = 600;
// export const dynamicParams = true; // or false, to 404 on unknown paths
// export async function generateStaticParams({ params, searchParams }: any) {
//   const controller = new apiDataController();
//   try {
//     const blog = await controller.GetApi(Constants.blogsSlug);
//     // return blog?.map((item: any) => ({
//     //   slug: [item?.slug_field], // Generate the slug parameter for each course
//     // }));
//     return blog.flatMap((item: any) => [
//       {
//         slug: [], // Generate the slug parameter for each course
//       },
//     ]);
//   } catch (error) {
//     console.error("Error fetching data for static params:", error);
//     return [];
//   }
// }
export async function generateStaticParams() {
  return [];
}
export default async function page({ params }: { params: any }) {
  const param = await params;
  const controller = new apiDataController();
  const blogsData = await controller.getDataApi(
    `${Constants.allblogs}?slug_field=${param.slug[0]}`
  );

  const blogsDatas = await controller.getDataApi(Constants.blogs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogsData.title,
    description: blogsData.description,
    image: blogsData.image,
    author: {
      "@type": "Organization",
      name: blogsData.author,
    },
    publisher: {
      "@type": "Organization",
      name: blogsData.publisherName,
      logo: {
        "@type": "ImageObject",
        url: blogsData.publisherLogo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogsData.url,
    },
    keywords: blogsData.keywords,
    articleSection: blogsData.articleSection,
    wordCount: blogsData.wordCount,
    articleBody: blogsData.articleBody,
    url: blogsData.url,
  };
  // console.log("testblog", blogsData);
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* <div>test</div> */}
      <BlogsMain filterdata={blogsData[0]} data={blogsDatas} type={"Blogs"} />
    </>
  );
}

export async function generateMetadata({ params, searchParams }: any) {
  const param = await params;
  const controller = new apiDataController();
  // const blogsData = await controller.getDataApi(
  //   `${Constants.blogs}?slug_field=${param.slug[0] || ""}`
  // );
  const blogsData = await controller.getDataApi(
    `${Constants.allblogs}?slug_field=${param.slug[0]}`
  );
  const baseURL = await fetchBaseUrl();
  return {
    title: `${blogsData[0]?.title} `,
    description: blogsData[0]?.meta_description || blogsData[0]?.description,
    keywords: blogsData[0]?.meta_keywords,

    openGraph: {
      title: `${blogsData[0]?.meta_title} `,
      url:
        blogsData == undefined
          ? `${baseURL}/blogs/ `
          : `${baseURL}/blogs/${blogsData[0]?.slug_field}`,
      siteName: "Royal defence academy",
      type: "website", // or 'article', 'product', etc.
      images: [
        {
          url: blogsData[0]?.image,
          width: 1200,
          height: 630,
          alt: blogsData[0]?.image_alt || "Default OG Image Alt",
        },
      ],
    },

    // Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: `${blogsData[0]?.meta_title} `,
      description: blogsData[0]?.meta_description,
      images: [blogsData[0]?.image],
    },

    // Other optional metadata
    viewport: "width=device-width, initial-scale=1.0",
    robots: {
      index: true, // or false
      follow: true, // or false
    },
    alternates: {
      canonical:
        blogsData == undefined
          ? `${baseURL}/blogs/ `
          : `${baseURL}/blogs/${blogsData[0]?.slug_field}`,
    },
  };
}
