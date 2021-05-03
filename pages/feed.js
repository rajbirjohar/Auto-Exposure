import Post from "../components/Post";

export default function Feed() {
  return (
    <section className="mx-auto max-w-7xl my-6">
      <h1 className="font-bold text-2xl tracking-loose">Feed</h1>
      <div className="flex space-x-6">
        <Post />
        <Post />
        <Post />
      </div>
    </section>
  );
}
