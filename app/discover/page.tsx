import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const AirplaneExperience = dynamic(
  () => import("@/app/discover/_components/AirplaneExperience"),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "100svh", background: "#d0cbc7" }} aria-hidden="true" />
    ),
  }
);

export default function DiscoverPage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <main>
        <AirplaneExperience />
      </main>
      <Footer />
    </>
  );
}
