import React from "react";

import BlogListItem from "../../components/BlogListItem";

export async function getStaticProps() {
  const query = encodeURIComponent(`*[_type == "post"]`);
  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());

  return {
    props: {
      posts: result.result,
    },
  };
}

export default function Posts({ posts }) {
  return (
    <div>
      <h1 className="capitalize text-5xl mb-16">all blog posts created</h1>
      <div className="grid gap-12 auto-rows-min md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogListItem key={post._id} item={post} />
        ))}
      </div>
    </div>
  );
}
