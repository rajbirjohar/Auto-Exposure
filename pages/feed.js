import Post from "../components/Post";
import Layout from "../components/Layout";

export default function Feed() {
  return (
    <Layout>
      <section>
        <h1 className="font-bold text-6xl my-10 tracking-loose">Feed</h1>
        <div className="flex flex-wrap">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
    </Layout>
  );
}
