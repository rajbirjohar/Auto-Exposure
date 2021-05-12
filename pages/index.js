import Layout from "../components/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout main>
      <section className="mx-auto">
        <div className="h-screen flex content-center items-center justify-center">
          <div className="absolute top-0 h-full w-full bg-hero-image bg-center bg-cover"></div>
          <div className="mx-auto">
            <h1>Auto Exposure</h1>
          </div>
        </div>
      </section>
    </Layout>
  );
}
