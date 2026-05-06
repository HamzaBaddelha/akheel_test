"use client";

import Image from "next/image";
import { memo, useEffect } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function ProgramImageLightbox({
  isOpen,
  title,
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && images.length > 1) onPrevious();
      if (event.key === "ArrowRight" && images.length > 1) onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image preview`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image preview"
        className="absolute right-4 top-4 z-[110] inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2C1622]/80 text-xl font-semibold text-[#E1E0D4] transition hover:bg-[#2C1622]"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            aria-label={`Previous image for ${title}`}
            className="absolute left-4 top-1/2 z-[110] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#2C1622]/80 text-2xl text-[#E1E0D4] transition hover:bg-[#2C1622]"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label={`Next image for ${title}`}
            className="absolute right-4 top-1/2 z-[110] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#2C1622]/80 text-2xl text-[#E1E0D4] transition hover:bg-[#2C1622]"
          >
            ›
          </button>
        </>
      )}

      <div className="relative mx-auto h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <Image
          src={images[activeIndex]}
          alt={title}
          fill
          sizes="100vw"
          quality={76}
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default memo(ProgramImageLightbox);
