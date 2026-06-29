import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { logoMedia } from "@/data/chambar-media";

export const metadata: Metadata = {
  title: "Proposta comercial | Koi Sushi Porto",
  description:
    "Proposta comercial para estratégia, presença digital e aquisição de clientes com páginas, Google e tráfego pago.",
  alternates: {
    canonical: "/proposta",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const proposalWhatsappPhone = "5563991081785";
const proposalWhatsappUrl = `https://api.whatsapp.com/send?phone=${proposalWhatsappPhone}&text=Olá%2C%20quero%20avançar%20com%20a%20proposta%20comercial.`;

const services = [
  {
    title: "Páginas / Landing Pages",
    price: "R$ 1.800",
    description:
      "Páginas comerciais pensadas para apresentar a marca, organizar a oferta e converter visitantes em contatos.",
    included: [
      "Estrutura estratégica da página",
      "Copy comercial",
      "Layout responsivo",
      "Integração com WhatsApp",
      "Seções de prova social",
      "Galeria / mídia / localização",
      "Publicação e ajustes finais",
    ],
  },
  {
    title: "Gestão Google",
    price: "R$ 1.300",
    description:
      "Gestão da presença no Google para fortalecer buscas locais, avaliações, rotas e intenção de compra.",
    included: [
      "Otimização do perfil",
      "Organização de informações comerciais",
      "Posts e atualizações",
      "Direcionamento para rota/contato",
      "Acompanhamento de presença local",
      "Melhorias de conversão no perfil",
    ],
  },
  {
    title: "Social Media + Tráfego Pago",
    price: "R$ 1.550",
    description:
      "Conteúdo e campanhas para manter a marca ativa, gerar demanda e atrair clientes com mais consistência.",
    included: [
      "Planejamento de conteúdo",
      "Artes e criativos",
      "Legendas comerciais",
      "Gestão de campanha",
      "Tráfego pago",
      "Ajustes de público e criativo",
      "Relatório básico de desempenho",
    ],
  },
] as const;

const summaryItems = [
  "Presença digital organizada para gerar confiança antes do primeiro contato.",
  "Canais conectados para transformar busca, tráfego e interesse em conversas comerciais.",
  "Estrutura visual alinhada ao posicionamento premium do negócio.",
] as const;

const comparisonItems = [
  {
    label: "Página",
    text: "Organiza oferta, prova social, mídia, localização e chamada direta para contato.",
  },
  {
    label: "Google",
    text: "Captura intenção local de quem já procura solução, rota, avaliação ou atendimento.",
  },
  {
    label: "Social + tráfego",
    text: "Mantém a marca ativa, aumenta demanda e acelera alcance com campanhas pagas.",
  },
] as const;

const nextSteps = [
  "Aprovação da proposta",
  "Envio de materiais da marca",
  "Organização das informações",
  "Produção da página e criativos",
  "Publicação e ajustes finais",
] as const;

function ProposalButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#c41e2f]/60 focus:ring-offset-2 focus:ring-offset-[#070707]";
  const variants = {
    primary:
      "bg-[#c41e2f] text-white shadow-[0_18px_44px_rgba(196,30,47,0.26)] hover:-translate-y-0.5 hover:bg-[#a91726]",
    secondary:
      "border border-white/15 bg-white/[0.06] text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1]",
  };

  return (
    <a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer"}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase text-[#c41e2f]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-base leading-7 text-white/64 md:text-lg">
          {text}
        </p>
      ) : null}
    </div>
  );
}

export default function ProposalPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section
        id="topo"
        className="relative isolate overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_72%_18%,rgba(196,30,47,0.2),transparent_28%),linear-gradient(135deg,#050505_0%,#101010_54%,#1b0b0d_100%)]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c41e2f] to-transparent" />
        <div className="container-page grid min-h-[88svh] items-center gap-12 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
          <div className="max-w-3xl">
            <a
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Voltar para o site Koi Sushi Porto"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] p-2">
                <Image
                  src={logoMedia.src}
                  alt={logoMedia.alt}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-xs font-black uppercase text-white/58">
                Proposta digital
              </span>
            </a>

            <div className="mt-14 h-1 w-16 rounded-full bg-[#c41e2f]" />
            <p className="mt-8 text-sm font-black uppercase text-[#ff5a66]">
              Plano pensado para gerar presença, confiança e conversão.
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl">
              Proposta comercial
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Estratégia, presença digital e aquisição de clientes com páginas,
              Google e tráfego pago.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ProposalButton href="#servicos" variant="primary">
                Avançar com a proposta
              </ProposalButton>
              <ProposalButton href={proposalWhatsappUrl} variant="secondary">
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </ProposalButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] border border-[#c41e2f]/20 bg-[#c41e2f]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#111] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-black uppercase text-white/44">
                    Escopo
                  </p>
                  <p className="mt-1 text-lg font-black text-white">
                    Digital comercial
                  </p>
                </div>
                <span className="rounded-full bg-[#c41e2f] px-3 py-1 text-xs font-black text-white">
                  Premium
                </span>
              </div>
              <div className="space-y-4 py-6">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div>
                      <p className="text-sm font-black text-white">
                        {service.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/48">
                        {service.description}
                      </p>
                    </div>
                    <strong className="shrink-0 text-base font-black text-[#ff5a66]">
                      {service.price}
                    </strong>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#c41e2f]/28 bg-[#c41e2f]/10 p-5">
                <p className="text-sm font-black text-white">Mais indicado</p>
                <p className="mt-2 text-sm leading-6 text-white/64">
                  Página + Google + Social Media com tráfego para criar
                  presença, capturar intenção e acelerar demanda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#080808] py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Resumo"
            title="Uma estrutura digital para transformar atenção em contato."
            text="A proposta combina clareza comercial, canais de intenção e campanhas para deixar a marca mais fácil de encontrar, entender e acionar."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {summaryItems.map((item, index) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-6"
              >
                <span className="text-sm font-black text-[#ff5a66]">
                  0{index + 1}
                </span>
                <p className="mt-5 text-base leading-7 text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="border-b border-white/10 bg-[#050505] py-16 md:py-24"
      >
        <div className="container-page">
          <SectionHeader
            eyebrow="Serviços"
            title="Três frentes comerciais, uma presença mais forte."
            text="Cada serviço resolve uma etapa do funil: apresentação, busca local e geração de demanda."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-lg border border-white/10 bg-[#101010] p-6 shadow-[0_20px_64px_rgba(0,0,0,0.28)]"
              >
                <div className="h-1 w-12 rounded-full bg-[#c41e2f]" />
                <h3 className="mt-6 text-2xl font-black leading-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-4xl font-black text-[#ff5a66]">
                  {service.price}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/64">
                  {service.description}
                </p>
                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-xs font-black uppercase text-white/42">
                    Incluso
                  </p>
                  <ul className="mt-5 space-y-3">
                    {service.included.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-white/72"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c41e2f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0a0a0a] py-16 md:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase text-[#c41e2f]">
              Recomendação estratégica
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Combinar os canais gera um sistema mais consistente.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              O melhor resultado vem da combinação entre página, presença no
              Google e tráfego. A página organiza a oferta, o Google captura
              intenção local e o tráfego acelera a demanda.
            </p>
            <div className="mt-7 rounded-lg border border-[#c41e2f]/32 bg-[#c41e2f]/12 p-5">
              <p className="text-sm font-black uppercase text-[#ff5a66]">
                Mais indicado
              </p>
              <p className="mt-2 text-xl font-black leading-snug text-white">
                Página + Google + Social Media com tráfego.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {comparisonItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-6"
              >
                <p className="text-lg font-black text-white">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#050505] py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Próximos passos"
            title="Um processo direto do aceite à publicação."
          />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-5">
            {nextSteps.map((step, index) => (
              <li
                key={step}
                className="rounded-lg border border-white/10 bg-[#101010] p-5"
              >
                <span className="text-sm font-black text-[#ff5a66]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm font-bold leading-6 text-white/76">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_50%_0%,rgba(196,30,47,0.2),transparent_34%),#080808] py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/[0.04] p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-black/30 p-2">
              <Image
                src={logoMedia.src}
                alt={logoMedia.alt}
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="mt-7 text-3xl font-black leading-tight text-white md:text-5xl">
              Pronto para avançar?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/66">
              Com a proposta aprovada, iniciamos a organização dos materiais e a
              produção da estrutura digital.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ProposalButton href={proposalWhatsappUrl}>
                Aprovar proposta
              </ProposalButton>
              <ProposalButton href={proposalWhatsappUrl} variant="secondary">
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </ProposalButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
