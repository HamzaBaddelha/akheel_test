import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";
import DestinationHighlights from "./_components/DestinationHighlights";
import PlanTripForm from "./_components/PlanTripForm";
import PlanTripHero from "./_components/PlanTripHero";
import PlanTripSteps from "./_components/PlanTripSteps";
import PlanTripTrustSections from "./_components/PlanTripTrustSections";
import PlanTripVideoText from "./_components/PlanTripVideoText";
import StickyWhatsAppButton from "./_components/StickyWhatsAppButton";

export default function PlanYourTripPage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <main className="pb-16 pt-16 sm:pt-20">
        <PlanTripHero />
        <Container className="space-y-14 py-14 sm:space-y-20 sm:py-20">
          <PlanTripVideoText />
          <PlanTripSteps />
          <PlanTripForm />
          <DestinationHighlights />
          <PlanTripTrustSections />
        </Container>
      </main>
      <StickyWhatsAppButton />
      <Footer />
    </>
  );
}
