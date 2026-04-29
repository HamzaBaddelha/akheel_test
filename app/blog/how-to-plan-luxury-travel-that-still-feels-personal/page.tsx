import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const ArticleContent = dynamic(() => import("./ArticleContent"), {
  ssr: true,
  loading: () => <div />,
});

export const metadata: Metadata = {
  title: "How to Plan Luxury Travel That Still Feels Personal | Atlas",
  description:
    "An editorial guide to planning luxury journeys that feel deeply personal, elegant, and unforgettable.",
};

export default function PersonalLuxuryTravelArticlePage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <ArticleContent />
      <Footer />
    </>
  );
}
