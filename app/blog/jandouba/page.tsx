import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const ArticleContent = dynamic(() => import("./ArticleContent"), {
  ssr: true,
  loading: () => <div />,
});

export const metadata: Metadata = {
  title: "Tunis Jandouba | Atlas",
  description:
    "Discover Ayn Darahim in Jandouba: cool mountain weather, pine forests, winter snow, and a peaceful Tunisian retreat.",
};

export default function JandoubaArticlePage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <ArticleContent />
      <Footer />
    </>
  );
}
