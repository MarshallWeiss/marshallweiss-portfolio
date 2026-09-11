import Image from "next/image";

interface LapidariumArtworkProps {
  compact?: boolean;
  variant?: "feature" | "card";
  imageSrc?: string | null;
}

/** One specimen, shown as an encyclopedia plate or a compact app thumbnail. */
export default function LapidariumArtwork({
  compact = false,
  variant = "feature",
  imageSrc,
}: LapidariumArtworkProps) {
  const presentation = compact ? "compact" : variant;
  const specimenSrc =
    presentation === "card"
      ? "https://lapidarium.vercel.app/renders/amber/amber_021.webp"
      : imageSrc || "/experiments/lapidarium/amethyst.webp";

  return (
    <div
      className={`lapidarium-art lapidarium-art--${presentation}`}
      aria-hidden="true"
    >
      {presentation !== "card" && (
        <span className="lapidarium-wordmark">
          {compact ? "L." : "Lapidarium"}
        </span>
      )}
      {presentation === "feature" && (
        <>
          <svg className="lapidarium-study" viewBox="0 0 120 200" fill="none">
            <path d="M60 8 99 64 91 174 57 192 24 173 21 64Z M60 8 57 77 21 64 M57 77 99 64 M57 77V192 M21 64 60 45 99 64 M60 45V8" />
            <path d="M13 185H104 M8 178V192 M109 178V192" strokeWidth=".6" />
          </svg>
          <span className="lapidarium-specimen-name">
            Amethyst
            <span>A specimen study</span>
          </span>
        </>
      )}
      <Image
        className="lapidarium-specimen"
        src={specimenSrc}
        width={800}
        height={800}
        alt=""
        sizes={compact ? "80px" : "(max-width: 760px) 70vw, 38vw"}
      />
    </div>
  );
}
