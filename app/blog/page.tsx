"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { latestStories, type BlogPost } from "@/app/blog/data";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group h-full overflow-hidden rounded-card border border-accent/30 bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
          {post.category}
        </p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-primary">
          <Link
            href={`/blog/${post.slug}`}
            className="transition hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">
          {post.excerpt}
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.12em] text-foreground/65">
          {post.date} · {post.readTime}
        </p>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const { t } = useI18n();
  const localizedLatestStories = latestStories.map((story) => ({
    ...story,
    title: t(`blog.latestStories.${story.slug}.title`) === `blog.latestStories.${story.slug}.title`
      ? story.title
      : t(`blog.latestStories.${story.slug}.title`),
    excerpt: t(`blog.latestStories.${story.slug}.excerpt`) === `blog.latestStories.${story.slug}.excerpt`
      ? story.excerpt
      : t(`blog.latestStories.${story.slug}.excerpt`),
    category: t(`blog.latestStories.${story.slug}.category`) === `blog.latestStories.${story.slug}.category`
      ? story.category
      : t(`blog.latestStories.${story.slug}.category`),
    date: t(`blog.latestStories.${story.slug}.date`) === `blog.latestStories.${story.slug}.date`
      ? story.date
      : t(`blog.latestStories.${story.slug}.date`),
    readTime: t(`blog.latestStories.${story.slug}.readTime`) === `blog.latestStories.${story.slug}.readTime`
      ? story.readTime
      : t(`blog.latestStories.${story.slug}.readTime`),
    imageAlt: t(`blog.latestStories.${story.slug}.imageAlt`) === `blog.latestStories.${story.slug}.imageAlt`
      ? story.imageAlt
      : t(`blog.latestStories.${story.slug}.imageAlt`),
  }));

  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <main className="pb-16 pt-20 sm:pt-24">
        <Container className="space-y-10 sm:space-y-14">
          <section className="relative overflow-hidden rounded-container border border-accent/35 bg-primary text-background">
            <div className="absolute inset-0">
              <Image
                src="/assets/hero.webp"
                alt="Luxury travel mood with layered landscape"
                fill
                priority
                className="object-cover opacity-35"
                sizes="100vw"
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40"
              aria-hidden="true"
            />
            <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/80">
                {t("blog.hero.badge")}
              </p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {t("blog.hero.title")}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/85 sm:text-base">
                {t("blog.hero.subtitle")}
              </p>
              <Link
                href="#latest-stories"
                className="mt-8 inline-flex items-center rounded-full border border-background/40 bg-background/10 px-5 py-2.5 text-sm font-medium text-background backdrop-blur-sm transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
              >
                {t("blog.hero.cta")}
              </Link>
            </div>
          </section>

          <section id="latest-stories" aria-labelledby="latest-stories-title">
            <div className="mb-6 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {t("blog.latest.badge")}
                </p>
                <h2
                  id="latest-stories-title"
                  className="mt-2 text-3xl font-semibold text-primary sm:text-4xl"
                >
                  {t("blog.latest.title")}
                </h2>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {localizedLatestStories.map((story) => (
                <BlogCard key={story.slug} post={story} />
              ))}
            </div>
          </section>

        </Container>
      </main>
      <Footer />
    </>
  );
}
