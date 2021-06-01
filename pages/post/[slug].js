import React from "react";
import PostPage from "../../components/PostPage";

export async function getStaticPaths() {
  const query = encodeURIComponent(`*[_type == "post"]{
      slug
  }`);
  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const paths = result.result.map((post) => {
    return {
      params: { slug: post.slug.current },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const query = encodeURIComponent(
    `*[_type == "post" && slug.current == "${params.slug}"]{
        title,
        mainImage,
        body,
        _createdAt,
        author->{
            name
        }
    }`
  );

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());

  return {
    props: {
      post: result.result[0],
    },
  };
}

export default function Post({ post }) {
  return (
    <div>
      <PostPage post={post} />
    </div>
  );
}
