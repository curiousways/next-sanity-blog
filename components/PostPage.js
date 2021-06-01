import { useState, useEffect } from "react";
import ImageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

export default function PostPage({ post }) {
  const { title, author, body, mainImage, _createdAt } = post;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgBuilder = ImageUrlBuilder({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: "production",
    });
    setImageUrl(imgBuilder.image(mainImage));
  }, [mainImage]);

  return (
    <div>
      <h1 className="text-5xl mb-6">{title}</h1>
      <p className="capitalize text-gray-500 mb-3">by {author.name}</p>
      <p className="capitalize text-gray-500 mb-5">{_createdAt}</p>
      <img src={imageUrl} className="w-full block" alt="" />
      <div className="post-content mt-8">
        <BlockContent blocks={body} />
      </div>
    </div>
  );
}
