"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Redirectblog({ data }: any) {
  const searchparams: any = useSearchParams();
  const slug = searchparams.get("blog");
  const router = useRouter();
  // console.log("test1234", slug);
  useEffect(() => {
    if (data.some((item: any) => item.slug_field == slug)) {
      router.push(`/blogs/${slug}`);
    }
  }, [data]);

  return <div>Royal Defence Academy</div>;
}
