type SectionIntroProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
};

export function SectionIntro({
  eyebrow,
  title,
  copy,
  light = false,
}: SectionIntroProps) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={`mt-4 text-3xl font-black leading-[1.05] md:text-5xl ${light ? "text-white" : "text-neutral-950"}`}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mt-4 text-base leading-7 md:text-lg ${light ? "text-white/72" : "text-neutral-600"}`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
