import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout main>
      <section className="mx-auto">
        <div className="h-screen">
          <h1>Home Page</h1>
        </div>
        <div className="h-screen">
          <h1>Details</h1>
        </div>
      </section>
    </Layout>
  );
}
