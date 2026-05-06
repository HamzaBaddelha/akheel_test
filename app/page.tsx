import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

const DestinationShowcase = dynamic(
  () => import("@/components/sections/DestinationShowcase"),
  { loading: () => <div className="h-[720px]" /> }
);
const DiscoverMore = dynamic(() => import("@/components/sections/DiscoverMore"), {
  loading: () => <div className="h-[760px]" />,
});

const Journey = dynamic(() => import("@/components/sections/Journey"), {
  loading: () => <div className="h-[760px]" />,
});
const CarouselImages = dynamic(() => import("@/components/sections/carouselimages"), {
  ssr: false,
  loading: () => <div className="h-[760px]" />,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="h-[520px]" />,
});
const ContactUs = dynamic(() => import("@/components/sections/ContactUs"), {
  ssr: false,
  loading: () => <div className="h-[640px]" />,
});
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <DestinationShowcase />
        <DiscoverMore />
        <Journey />
        <CarouselImages />
        <Testimonials />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
