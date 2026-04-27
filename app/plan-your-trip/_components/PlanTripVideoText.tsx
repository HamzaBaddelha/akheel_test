import { VideoText } from "@/registry/magicui/video-text";

export default function PlanTripVideoText() {
  return (
    <section aria-label="Video text banner">
      <div className="relative h-[120px] w-full overflow-hidden rounded-3xl border border-accent/45 bg-background/20 sm:h-[190px]">
        <VideoText
          src="https://cdn.magicui.design/ocean-small.webm"
          className="h-full w-full"
          fontSize="clamp(48px, 14vw, 126px)"
          letterSpacing={1}
          fontFamily="Montserrat, sans-serif"
        >
          MAKE A PLAN
        </VideoText>
      </div>
    </section>
  );
}
