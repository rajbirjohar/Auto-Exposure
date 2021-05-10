import Layout from "../components/Layout";
import Post from "../components/Post";
import PostLoad from "../components/PostLoad";

export default function Feed() {
  return (
    <Layout>
      <section>
        <h1 className="font-bold text-6xl my-10 tracking-loose">Feed</h1>
        <div className="flex flex-wrap">
          <PostLoad />
          <Post />
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
