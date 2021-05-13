import Link from "next/link";
import Layout from "../components/Layout";
import Post from "../components/Post";
import PostLoad from "../components/PostLoad";

export default function Feed() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl">
        <h1 className="font-bold text-3xl tracking-loose">Feed</h1>
        <Link href="/newpost">
          <button className="bg-gray-200 text-black rounded-sm py-1 px-3 my-5 font-medium">
            New Post
          </button>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Post />
          <PostLoad />
          <Post />
          <Post />
          <PostLoad />
          <Post />
          <Post />
          <Post />
          <PostLoad />
          <Post />
          <PostLoad />
          <Post />
        </div>
      </section>
    </Layout>
  );
}
