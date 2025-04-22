import Head from 'next/head';

export default function MetaTags ({ meta })  {
  return (
    <Head>
      { (
        <>
          {/* Meta Tags for SEO */}
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords} />
          <link rel="canonical" href={meta.canonical_url} />

          {/* Open Graph Tags */}
          <meta property="og:title" content={meta.og_title} />
          <meta property="og:description" content={meta.og_description} />
          <meta property="og:image" content={meta.og_image} />
          <meta property="og:url" content={meta.og_url} />

          {/* Twitter Card */}
          <meta name="twitter:card" content={meta.twitter_card} />
          <meta name="twitter:title" content={meta.og_title} />
          <meta name="twitter:description" content={meta.og_description} />
          <meta name="twitter:image" content={meta.og_image} />
          
        </>
      )}
    </Head>
  );
};

 
