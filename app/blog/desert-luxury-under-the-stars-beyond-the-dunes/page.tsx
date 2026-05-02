import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const ArticleContent = dynamic(() => import("./ArticleContent"), {
  ssr: true,
  loading: () => <div />,
});

export const metadata: Metadata = {
  title: "Desert Luxury Under the Stars: Beyond the Dunes | Atlas",
  description:
    "Discover a cinematic desert editorial on lantern-lit camps, dawn camel rides, and refined comfort beneath open skies.",
};

export default function DesertLuxuryArticlePage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <ArticleContent />
      <Footer />
    </>
  );
}
