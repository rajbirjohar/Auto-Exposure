import Layout from "../components/Layout";
import Post from "../components/Post";
import PostLoad from "../components/PostLoad";

export default function Feed() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl">
        <h1 className="font-bold text-3xl tracking-loose">Feed</h1>
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
