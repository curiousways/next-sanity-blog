import { useState, useEffect } from "react";
import Link from "next/link";
import ImageUrlBuilder from "@sanity/image-url";

export default function BlogListItem({ item }) {
  const [imageUrl, setImageUrl] = useState("");
  const { mainImage, title, slug } = item;

  useEffect(() => {
    const imgBuilder = ImageUrlBuilder({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: "production",
    });
    setImageUrl(imgBuilder.image(mainImage));
  }, [mainImage]);

  return (
    <div className="shadow-md">
      <img src={imageUrl} className="w-full block" alt="" />
      <div className="px-4 py-8">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <Link href="/post/[id]" as={`/post/${slug.current}`}>
          <a className="block mt-6 text-xl">View post &#8594;</a>
        </Link>
      </div>
    </div>
  );
}
