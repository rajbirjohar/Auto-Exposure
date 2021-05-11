import Layout from "../components/Layout";
import Post from "../components/Post";
import PostLoad from "../components/PostLoad";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  return (
    <Layout>
      <section className="mx-auto ">
        <h1 className="font-bold text-6xl my-10 tracking-loose">Profile</h1>
        <div className="flex xl:flex-row flex-col">
          <ProfileCard />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
            <PostLoad />
            <Post />
            <Post />
            <Post />
            <PostLoad />
            <Post />
            <Post />
            <Post />
            <PostLoad />
          </div>
        </div>
      </section>
    </Layout>
  );
}
