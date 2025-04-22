import BlogsMain from "@/app/components/blogs/BlogsMain";

import { Constants, fetchBaseUrl } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
// import { store } from "@/store";
// import { setHomepageTitle } from "@/store/homepageSlice";

export const revalidate = 60;
// export const dynamicParams = true; // or false, to 404 on unknown paths
export async function generateStaticParams({ params, searchParams }: any) {
  const controller = new apiDataController();
  try {
    const blog = await controller.GetApi(Constants.news);
    // return blog?.map((item: any) => ({
    //   slug: [item?.slug_field], // Generate the slug parameter for each course
    // }));
    return blog.flatMap((item: any) => [
      {
        slug: [item?.slug_field], // Generate the slug parameter for each course
      },
    ]);
  } catch (error) {
    console.error("Error fetching data for static params:", error);
    return [];
  }
}
export default async function page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const param = await params;
  const controller = new apiDataController();
  const newsData = await controller.getDataApi(
    `${Constants.news}?slug_field=${param.slug[0]}`
  );

  const newsDatas = await controller.getDataApi(Constants.news);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: newsData.title,
    description: newsData.description,
    image: newsData.image,
    author: {
      "@type": "Organization",
      name: newsData.author,
    },
    publisher: {
      "@type": "Organization",
      name: newsData.publisherName,
      logo: {
        "@type": "ImageObject",
        url: newsData.publisherLogo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": newsData.url,
    },
    keywords: newsData.keywords,
    articleSection: newsData.articleSection,
    wordCount: newsData.wordCount,
    articleBody: newsData.articleBody,
    url: newsData.url,
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogsMain filterdata={newsData[0]} data={newsDatas} type={"news"} />
    </>
  );
}

export async function generateMetadata({ params, searchParams }: any) {
  const param = await params;
  const controller = new apiDataController();
  const newsData = await controller.getDataApi(
    `${Constants.news}?slug_field=${param.slug[0]}`
  );
    const baseURL = fetchBaseUrl();
  return {
    title: `${newsData[0]?.title} `,
    description: newsData[0]?.meta_description || newsData[0]?.description,
    keywords: newsData[0]?.meta_keywords,

    openGraph: {
      title: `${newsData[0]?.meta_title} `,
      url:
        newsData == undefined
          ? `${baseURL}/news/ `
          : `${baseURL}/${newsData[0]?.slug_field}`,
      siteName: "Royal defence academy",
      type: "website", // or 'article', 'product', etc.
      images: [
        {
          url: newsData[0]?.image,
          width: 1200,
          height: 630,
          alt: newsData[0]?.image_alt || "Default OG Image Alt",
        },
      ],
    },

    // Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: `${newsData[0]?.meta_title} `,
      description: newsData[0]?.meta_description,
      images: [newsData[0]?.image],
    },

    // Other optional metadata
    viewport: "width=device-width, initial-scale=1.0",
    robots: {
      index: true, // or false
      follow: true, // or false
    },
    alternates: {
      canonical:
        newsData == undefined
          ? `${baseURL}/news/ `
          : `${baseURL}/news/${newsData[0]?.slug_field}`,
    },
  };
}
