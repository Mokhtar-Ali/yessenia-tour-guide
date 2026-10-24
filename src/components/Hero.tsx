"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { media } from "@/lib/media";
import { AnimatedHeading } from "./AnimatedHeading";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export function Hero({ locale, hero }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-burgundy-deep">
      {/* TODO: replace this gradient with a hero video or photo of Medellín */}
      <motion.div
        style={{ y: shift }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#8f1b43_0%,#6d1230_35%,#470a1e_70%,#1a0309_100%)]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/20 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 inline-block rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
        >
          {hero.eyebrow}
        </motion.p>

        <AnimatedHeading
          as="h1"
          text={hero.title}
          delay={0.2}
          className="font-display max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-7xl xl:text-8xl"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/80"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href={localePath(locale, "/tours")}
            className="rounded-full bg-white px-8 py-4 font-semibold text-burgundy transition hover:-translate-y-0.5 hover:bg-gold hover:text-burgundy-deep"
          >
            {hero.cta}
          </Link>
          <Link
            href={localePath(locale, "/contact")}
            className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            {hero.cta2}
          </Link>
        </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-white/25 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <Image
              src={media("about me.jpeg")}
              alt="Yessenia"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
