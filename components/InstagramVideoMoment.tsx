import Image from "next/image";

type InstagramVideoMomentProps = {
  imageSrc: string;
};

export function InstagramVideoMoment({ imageSrc }: InstagramVideoMomentProps) {
  return (
    <section className="ig-video-reveal is-visible mt-6 rounded-[26px] border border-black/10 bg-white p-3 shadow-[0_14px_34px_rgba(16,16,16,0.07)]">
      <div className="grid grid-cols-[0.82fr_1.18fr] items-center gap-3">
        <div className="px-1">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-[var(--chambar-red)]">
            KOI SUSHI PORTO
          </p>
          <h2 className="mt-2 text-xl font-black leading-[1.04] text-neutral-950">
            Antes do seu primeiro pedido.
          </h2>
          <div className="mt-4 h-px w-14 bg-[var(--chambar-red)]" />
        </div>
        <div className="relative ml-auto aspect-[9/16] w-full max-w-[192px] overflow-hidden rounded-[24px] bg-neutral-950 shadow-[0_16px_36px_rgba(16,16,16,0.16)]">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="192px"
            loading="lazy"
            className="scale-[1.03] object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/24 to-transparent" />
        </div>
      </div>
    </section>
  );
}
