import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";
import ProgramsCTA from "@/app/programs/_components/ProgramsCTA";
import ProgramsClient from "@/app/programs/_components/ProgramsClient";
import ProgramsHero from "@/app/programs/_components/ProgramsHero";
import TunisSection from "@/app/programs/_components/tunis";
import ProgramsValueProps from "@/app/programs/_components/ProgramsValueProps";
import {
  PROGRAMS_BG_COLOR,
  PROGRAMS_PRIMARY_COLOR,
  VALUE_PROPS,
} from "@/lib/programs/constants";
import { getPrograms } from "@/lib/programs/getPrograms";

export const dynamic = "force-static";
export const revalidate = false;

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <Header fixedBgColor={PROGRAMS_PRIMARY_COLOR} />
      <main
        className="overflow-x-clip pb-16 pt-20 text-[#2c2216] sm:pb-20 sm:pt-24"
        style={{ background: PROGRAMS_BG_COLOR }}
      >
        <ProgramsHero />
        <Container className="space-y-12 sm:space-y-20">
          <ProgramsClient programs={programs} />
          <ProgramsValueProps valueProps={VALUE_PROPS} />
          <TunisSection />
          <ProgramsCTA />
        </Container>
      </main>
      <Footer />
    </>
  );
}
