"use client";

import { Button, Card, CardBody } from "@heroui/react";
import {
  Menu,
  Linkedin,
  Github,
  Mail,
  Calendar,
  Clock4,
  MessageCircle,
  Zap,
  GraduationCap,
  Award,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { ContactForm } from "@/components/ContactForm";
import { BackToTop } from "@/components/BackToTop";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { SkillsChip } from "@/components/SkillsChip";
import { Reveal } from "@/components/Reveal";
import { StatCard } from "@/components/StatCard";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { site } from "@/content/site";
import { earlierRoles, roles } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import {
  certifications,
  education,
  spokenLanguages,
} from "@/content/education";
import type { Project } from "@/content/project";

const chipColor =
  "bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md";

const timezoneIcons = [Clock4, MessageCircle, Zap];

export function HomePage({ projects }: { projects: Project[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <BackToTop />
      <main className="flex flex-col min-h-screen w-full max-w-[1440px] mx-auto">
        <header className="sticky top-0 z-50 flex items-center justify-between h-16 md:h-[72px] lg:h-20 px-5 md:px-10 lg:px-[120px] bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-white/5">
          <span className="text-[var(--accent-gold)] font-jetbrains text-2xl md:text-[26px] lg:text-[28px] font-bold">
            TB
          </span>

          <Navbar />
          <Button
            className="hidden md:flex bg-[var(--accent-gold)] text-[var(--bg-primary)] font-inter text-[13px] lg:text-sm font-semibold px-5 lg:px-6 py-[10px] lg:py-3 rounded-md"
            onPress={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>

          <button
            className="md:hidden flex items-center justify-center rounded-lg h-10 w-10"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </header>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <section
          id="hero"
          className="flex flex-col items-center bg-[var(--bg-primary)] gap-6 lg:gap-8 px-5 md:px-10 lg:px-[120px] pt-[60px] md:pt-20 lg:pt-[100px] pb-20 md:pb-[100px] lg:pb-[120px]"
        >
          <div className="flex items-center gap-2 rounded-full bg-[var(--bg-tertiary)] px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
            <span className="text-[var(--text-secondary)] font-jetbrains text-[10px] lg:text-xs font-medium">
              {site.availabilityBadge}
            </span>
          </div>

          <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full border-[3px] border-[var(--accent-gold)] bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden">
            <Image
              src={site.avatar}
              alt={site.name}
              width={160}
              height={160}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-white font-inter text-4xl md:text-[52px] lg:text-[72px] font-bold text-center">
            {site.name}
          </h1>

          <span className="text-[var(--accent-gold)] font-jetbrains text-base md:text-xl lg:text-2xl font-medium text-center">
            {site.positioning}
          </span>

          <div className="flex items-center gap-2 rounded-full bg-[var(--bg-tertiary)] px-4 py-2 border border-[var(--text-muted)]/20">
            <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="text-[var(--text-secondary)] font-inter text-xs lg:text-sm font-medium">
              {site.locationLabel}
            </span>
          </div>

          <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-normal leading-[1.6] text-center w-full md:max-w-[600px] lg:max-w-[700px]">
            {site.heroDescription} {site.currentRole}
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 lg:gap-4 w-full md:w-auto">
            <Button
              className="w-full md:w-auto h-auto py-4 px-8 lg:px-8 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-inter text-sm lg:text-base font-semibold rounded-lg"
              radius="sm"
              onPress={() => scrollToSection("contact")}
            >
              Let&apos;s Work Together
            </Button>
            <Button
              variant="bordered"
              className="w-full md:w-auto h-auto py-4 px-8 lg:px-8 border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] font-inter text-sm lg:text-base font-semibold rounded-lg bg-transparent"
              radius="sm"
              onPress={() => scrollToSection("portfolio")}
            >
              View My Work
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal">
              Connect with me:
            </span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
            >
              <Linkedin className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
            >
              <Github className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
            </a>
          </div>
        </section>

        <section
          id="about"
          className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
        >
          <Reveal>
            <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
              <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
                ABOUT ME
              </span>
              <h2 className="text-white font-inter text-2xl md:text-[32px] lg:text-[42px] font-bold text-center">
                Turning Ideas Into Reality
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:max-w-[1200px]">
            <Reveal delay={0.1} className="flex flex-col gap-6 w-full lg:flex-1">
              <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-base font-normal leading-[1.7] text-center lg:text-left w-full">
                {site.bio[0]}
              </p>
              <p className="hidden lg:block text-[var(--text-secondary)] font-inter text-base font-normal leading-[1.7] text-left w-full">
                Industries: {site.industries.join(", ")}.
              </p>
            </Reveal>

            <Reveal
              delay={0.2}
              className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 w-full md:max-w-[800px] lg:max-w-none lg:flex-1"
            >
              <div className="flex gap-4 lg:gap-6 w-full md:flex-1 lg:flex-none">
                <StatCard value={site.highlights[0].value} label={site.highlights[0].label} />
                <StatCard value={site.highlights[1].value} label={site.highlights[1].label} />
              </div>
              <div className="flex gap-4 lg:gap-6 w-full md:flex-1 lg:flex-none">
                <StatCard value={site.highlights[2].value} label={site.highlights[2].label} />
                <StatCard value={site.highlights[3].value} label={site.highlights[3].label} />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="skills"
          className="flex flex-col items-center bg-[var(--bg-primary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
        >
          <Reveal>
            <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
              <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
                TECHNICAL EXPERTISE
              </span>
              <h2 className="text-white font-inter text-2xl md:text-[32px] lg:text-[42px] font-bold text-center">
                Technologies I Work With
              </h2>
              <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-normal text-center">
                {site.skillsIntro}
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full lg:max-w-[1200px]"
          >
            {skillGroups.map((group) => (
              <Card
                key={group.title}
                className="bg-[var(--bg-tertiary)] border-none rounded-xl"
                shadow="none"
              >
                <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
                  <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                    {group.title}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {group.items.map((item) => (
                      <SkillsChip key={item} label={item} color={chipColor} />
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </Reveal>
        </section>

        <ProjectCarousel projects={projects} />

        <section
          id="experience"
          className="flex flex-col items-center bg-[var(--bg-primary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
        >
          <Reveal>
            <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
              <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
                WORK EXPERIENCE
              </span>
              <h2 className="text-white font-inter text-2xl md:text-[32px] lg:text-[42px] font-bold text-center">
                Companies I&apos;ve Worked With
              </h2>
              <p className="hidden lg:block text-[var(--text-secondary)] font-inter text-lg font-normal text-center">
                A track record of delivering high-impact solutions for global
                companies
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="flex flex-col gap-4 lg:gap-6 w-full lg:max-w-[1200px]"
          >
            {roles.map((role) => (
              <Card
                key={role.id}
                className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl"
                shadow="none"
              >
                <CardBody className="flex flex-col lg:flex-row gap-3 lg:gap-6 p-5 lg:p-8">
                  <div className="flex flex-col gap-2 lg:w-[200px] lg:flex-shrink-0">
                    <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--bg-primary)]">
                      <span className="text-[var(--accent-gold)] font-jetbrains text-xl font-bold">
                        {role.monogram}
                      </span>
                    </div>
                    <span className="text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-sm font-medium">
                      {role.dates}
                    </span>
                    <span className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                      {role.location}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 lg:gap-3 flex-1">
                    <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                      {role.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                      {role.company}
                    </p>
                    <p className="text-[var(--text-muted)] font-inter text-xs lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6]">
                      {role.bullets.join(" ")}
                    </p>
                    <div className="hidden lg:flex flex-wrap gap-2 mt-1">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}

            <Card
              className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl lg:rounded-2xl"
              shadow="none"
            >
              <CardBody className="flex flex-col items-center gap-3 lg:gap-4 p-5 lg:p-8">
                <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-medium text-center">
                  Also collaborated with
                </span>
                <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-10">
                  {earlierRoles.map((item, index) => (
                    <span key={item.label} className="contents">
                      {index > 0 ? (
                        <span className="hidden lg:inline text-[var(--bg-tertiary)] font-inter text-lg">
                          |
                        </span>
                      ) : null}
                      <span className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-semibold">
                        {item.label}
                      </span>
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Reveal>
        </section>

        <section className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]">
          <Reveal>
            <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
              <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
                EDUCATION
              </span>
              <h2 className="text-white font-inter text-2xl md:text-[32px] lg:text-[42px] font-bold text-center">
                Academic Background
              </h2>
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-8 w-full lg:max-w-[1200px]"
          >
            {education.map((entry) => (
              <Card
                key={entry.credential}
                className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl flex-1 lg:min-w-[320px]"
                shadow="none"
              >
                <CardBody className="flex flex-col gap-3 lg:gap-5 p-5 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-5">
                    <div className="flex items-center justify-center rounded-xl bg-[#FFD70015] h-10 w-10 lg:h-14 lg:w-14 flex-shrink-0">
                      <GraduationCap className="w-5 h-5 lg:w-7 lg:h-7 text-[var(--accent-gold)]" />
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                        {entry.credential}
                      </h3>
                      <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                        {entry.school}
                      </p>
                      {entry.location ? (
                        <p className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                          {entry.location}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {entry.dates ? (
                    <div className="bg-[var(--bg-primary)] text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-[13px] font-medium px-3 py-[6px] rounded-md w-fit">
                      {entry.dates}
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            ))}
          </Reveal>

          <Reveal
            delay={0.2}
            className="flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-8 w-full lg:max-w-[1200px]"
          >
            {certifications.map((item) => (
              <Card
                key={item.name}
                className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl flex-1 lg:min-w-[280px]"
                shadow="none"
              >
                <CardBody className="flex flex-col gap-3 lg:gap-5 p-5 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-5">
                    <div className="flex items-center justify-center rounded-xl bg-[#FFD70015] h-10 w-10 lg:h-14 lg:w-14 flex-shrink-0">
                      <Award className="w-5 h-5 lg:w-7 lg:h-7 text-[var(--accent-gold)]" />
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                        {item.issuer}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[var(--bg-primary)] text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-[13px] font-medium px-3 py-[6px] rounded-md w-fit">
                    {item.date}
                  </div>
                </CardBody>
              </Card>
            ))}
          </Reveal>

          <Reveal delay={0.25} className="w-full lg:max-w-[1200px]">
            <Card
              className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl"
              shadow="none"
            >
              <CardBody className="flex flex-col gap-3 lg:gap-4 p-5 lg:p-8">
                <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                  Languages
                </span>
                <div className="flex gap-2 flex-wrap">
                  {spokenLanguages.map((language) => (
                    <SkillsChip
                      key={language.name}
                      label={`${language.name} · ${language.level}`}
                      color={chipColor}
                    />
                  ))}
                </div>
              </CardBody>
            </Card>
          </Reveal>
        </section>

        <section className="flex flex-col items-center bg-[var(--bg-primary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]">
          <Reveal>
            <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
              <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
                {site.timezone.eyebrow}
              </span>
              <h2 className="text-white font-inter text-xl md:text-[28px] lg:text-[42px] font-bold text-center w-full">
                {site.timezone.heading}
              </h2>
              <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-lg font-normal text-center w-full">
                {site.timezone.intro}
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="flex flex-col md:flex-row gap-4 lg:gap-8 w-full lg:max-w-[1200px]"
          >
            {site.timezone.cards.map((card, index) => {
              const Icon = timezoneIcons[index] ?? Clock4;
              return (
                <Card
                  key={card.title}
                  className="bg-[var(--bg-tertiary)] border-none md:flex-1 rounded-xl lg:rounded-2xl"
                  shadow="none"
                >
                  <CardBody className="flex flex-col items-center gap-3 lg:gap-4 p-5 lg:p-8">
                    <div className="flex items-center justify-center rounded-full bg-[#FFD70020] h-12 w-12 lg:h-16 lg:w-16">
                      <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--accent-gold)]" />
                    </div>
                    <h3 className="text-white font-inter text-base lg:text-xl font-semibold text-center">
                      {card.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6] text-center w-full">
                      {card.body}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </Reveal>
        </section>

        <section
          id="contact"
          className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
        >
          <Reveal>
            <Card
              className="bg-[var(--bg-tertiary)] border-none w-full md:max-w-[600px] lg:max-w-[800px] rounded-2xl lg:rounded-3xl"
              shadow="none"
            >
              <CardBody className="flex flex-col items-center gap-6 lg:gap-8 px-6 lg:px-20 py-10 lg:py-16">
                <span className="text-[var(--accent-gold)] font-jetbrains text-[9px] lg:text-xs font-semibold tracking-[2px] text-center">
                  LET&apos;S BUILD SOMETHING GREAT
                </span>
                <h2 className="text-white font-inter text-[22px] md:text-[28px] lg:text-4xl font-bold text-center w-full">
                  Ready to Start Your Next Project?
                </h2>
                <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-normal leading-[1.6] text-center w-full md:max-w-[500px] lg:max-w-[600px]">
                  {site.contactIntro} Email{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[var(--accent-gold)] hover:underline"
                  >
                    {site.email}
                  </a>
                  .
                </p>

                <div className="flex flex-col md:flex-row gap-3 lg:gap-4 w-full md:justify-center">
                  <Button
                    className="w-full md:w-auto h-auto py-4 lg:py-[18px] px-6 lg:px-10 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-inter text-sm lg:text-base font-semibold rounded-lg flex flex-row items-center justify-center gap-[10px]"
                    radius="sm"
                    onPress={() => scrollToSection("contact-form")}
                  >
                    <Mail className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-[var(--bg-primary)]" />
                    Get In Touch
                  </Button>
                  <Button
                    variant="bordered"
                    className="w-full md:w-auto h-auto py-4 lg:py-[18px] px-6 lg:px-10 border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] font-inter text-sm lg:text-base font-semibold rounded-lg bg-transparent flex flex-row items-center justify-center gap-[10px]"
                    radius="sm"
                    onPress={() => window.open(site.calendly, "_blank")}
                  >
                    <Calendar className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-[var(--accent-gold)]" />
                    Schedule a Call
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              id="contact-form"
              className="w-full md:max-w-[600px] lg:max-w-[700px]"
            >
              <div className="flex flex-col items-center gap-4 mb-8 mt-8">
                <h3 className="text-white font-inter text-xl md:text-2xl lg:text-3xl font-bold text-center">
                  Send Me a Message
                </h3>
                <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-base font-normal text-center">
                  Fill out the form below and I&apos;ll get back to you within
                  24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>

        <footer className="flex flex-col items-center bg-[var(--bg-primary)] gap-6 lg:gap-8 px-5 md:px-10 lg:px-[120px] py-8 lg:py-12">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 w-full">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
              <span className="text-[var(--accent-gold)] font-jetbrains text-xl lg:text-2xl font-bold">
                <Image
                  src={site.avatar}
                  alt={site.name}
                  width={32}
                  height={32}
                />
              </span>
              <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal text-center">
                {site.positioning}
              </span>
            </div>

            <div className="flex gap-3 lg:gap-4">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
              >
                <Github className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
                className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
              >
                <Linkedin className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
              </a>
            </div>
          </div>

          <div className="h-px bg-[var(--bg-tertiary)] w-full" />

          <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 w-full">
            <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal text-center">
              2026 {site.name}. All rights reserved.
            </span>
            <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal text-center">
              Buenos Aires, Argentina
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
