import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const ArticleContent = dynamic(() => import("./ArticleContent"), {
  ssr: true,
  loading: () => <div />,
});

export const metadata: Metadata = {
  title: "Cultural Journeys Through Historic Medinas | Atlas",
  description:
    "Discover a luxury editorial journey through historic medinas, artisan heritage, and refined cultural travel experiences.",
};

export default function CulturalJourneysArticlePage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <ArticleContent />
      <Footer />
    </>
  );
}
