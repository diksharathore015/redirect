import Head from "next/head";

export default function InnerPageMeta({ data }: any) {
  return (
    <Head>
      {/* Meta Tags for SEO */}
      <title>{data?.meta_title}</title>
      <meta name="description" content={data?.meta_description} />
      <meta name="keywords" content={data?.meta_keyword} />
      <link rel="canonical" href={data?.canonical_url} />
      {/* Open Graph Tags */}
      <meta property="og:title" content={data?.meta_title} />
      <meta property="og:description" content={data?.meta_description} />
      <meta property="og:image" content={data?.image} />
      <meta property="og:url" content={data?.og_url} />
      {/* Twitter Card */}
      <meta name="twitter:card" content={data?.meta_title} />
      <meta name="twitter:title" content={data?.meta_title} />
      <meta name="twitter:description" content={data?.meta_description} />
      <meta name="twitter:image" content={data?.image} />
    </Head>
  );
}
