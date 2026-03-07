"use client";

import { Button, Card, CardBody, Chip } from "@heroui/react";
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
import { Portfolio } from "@/components/Portfolio";
import { SkillsChip } from "@/components/SkillsChip";
import { Reveal } from "@/components/Reveal";
import { StatCard } from "@/components/StatCard";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full max-w-[1440px] mx-auto">
      {/* Header - responsive: mobile h:64px, tablet h:72px, desktop h:80px */}
      <header className="flex items-center justify-between h-16 md:h-[72px] lg:h-20 px-5 md:px-10 lg:px-[120px] bg-[var(--bg-primary)]">
        <span className="text-[var(--accent-gold)] font-jetbrains text-2xl md:text-[26px] lg:text-[28px] font-bold">
          TB
        </span>

        {/* Desktop Nav - hidden on mobile, shown on tablet+ */}
        <Navbar />
        {/* Hire Me CTA - hidden on mobile */}
        <Button
          className="hidden md:flex bg-[var(--accent-gold)] text-[var(--bg-primary)] font-inter text-[13px] lg:text-sm font-semibold px-5 lg:px-6 py-[10px] lg:py-3 rounded-md"
          onPress={() => scrollToSection("contact")}
        >
          Hire Me
        </Button>

        {/* Mobile menu button - hidden on tablet+ */}
        <button
          className="md:hidden flex items-center justify-center rounded-lg h-10 w-10"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Hero Section - responsive */}
      <section
        id="hero"
        className="flex flex-col items-center bg-[var(--bg-primary)] gap-6 lg:gap-8 px-5 md:px-10 lg:px-[120px] pt-[60px] md:pt-20 lg:pt-[100px] pb-20 md:pb-[100px] lg:pb-[120px]"
      >
        {/* Available Label */}
        <div className="flex items-center gap-2 rounded-full bg-[var(--bg-tertiary)] px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
          <span className="text-[var(--text-secondary)] font-jetbrains text-[10px] lg:text-xs font-medium">
            Available for new projects
          </span>
        </div>

        {/* Profile Image */}
        <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full border-[3px] border-[var(--accent-gold)] bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/avatar.jpg"
            alt="Tony Blanco"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="text-white font-inter text-4xl md:text-[52px] lg:text-[72px] font-bold text-center">
          Tony Blanco
        </h1>

        {/* Title */}
        <span className="text-[var(--accent-gold)] font-jetbrains text-base md:text-xl lg:text-2xl font-medium text-center">
          Full Stack Engineer
        </span>

        {/* Location Badge */}
        <div className="flex items-center gap-2 rounded-full bg-[var(--bg-tertiary)] px-4 py-2 border border-[var(--text-muted)]/20">
          <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-[var(--text-secondary)] font-inter text-xs lg:text-sm font-medium">
            Buenos Aires, Argentina
          </span>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-normal leading-[1.6] text-center w-full md:max-w-[600px] lg:max-w-[700px]">
          10+ years crafting scalable web applications with React, Node.js, and
          modern technologies. Based in Argentina, serving clients worldwide
          with US-friendly hours.
        </p>

        {/* CTA Buttons - responsive: vertical on mobile, horizontal on tablet+ */}
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

        {/* Social Links - gap:16px */}
        <div className="flex items-center gap-4">
          <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal">
            Connect with me:
          </span>
          <a
            href="https://linkedin.com/in/tblancog"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
            className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
          >
            <Linkedin className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
          </a>
          <a
            href="https://github.com/tblancog"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
            className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
          >
            <Github className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
          </a>
        </div>
      </section>

      {/* About Section - responsive */}
      <section
        id="about"
        className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
      >
        {/* Header - gap:12px */}
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

        {/* Desktop: Two-column layout (description left, stats right) */}
        {/* Mobile/Tablet: Single column */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:max-w-[1200px]">
          {/* Left Column - Description (desktop only shows two paragraphs) */}
          <Reveal delay={0.1} className="flex flex-col gap-6 w-full lg:flex-1">
            <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-base font-normal leading-[1.7] text-center lg:text-left w-full">
              Experienced professional who has worked as a full-stack engineer
              on numerous projects, utilizing both front-end and back-end
              frameworks in collaboration with product and engineering teams.
            </p>
            <p className="hidden lg:block text-[var(--text-secondary)] font-inter text-base font-normal leading-[1.7] text-left w-full">
              With over 10 years of solid hands-on experience in web
              development, I consistently maintain a genuine interest in staying
              updated on the latest web best practices. I proactively generate
              proposals for the most effective approaches.
            </p>
          </Reveal>

          {/* Right Column - Stats Grid */}
          <Reveal
            delay={0.2}
            className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 w-full md:max-w-[800px] lg:max-w-none lg:flex-1"
          >
            {/* Row 1 */}
            <div className="flex gap-4 lg:gap-6 w-full md:flex-1 lg:flex-none">
              <StatCard value="10+" label="Years Experience" />
              <StatCard value="50+" label="Projects Delivered" />
            </div>
            {/* Row 2 */}
            <div className="flex gap-4 lg:gap-6 w-full md:flex-1 lg:flex-none">
              <StatCard value="8+" label="Countries Served" />
              <StatCard value="100%" label="Client Satisfaction" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section - responsive */}
      <section
        id="skills"
        className="flex flex-col items-center bg-[var(--bg-primary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
      >
        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
            <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
              TECHNICAL EXPERTISE
            </span>
            <h2 className="text-white font-inter text-2xl md:text-[32px] lg:text-[42px] font-bold text-center">
              Technologies I Work With
            </h2>
            <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-normal text-center">
              A comprehensive toolkit built over a decade of hands-on
              development
            </p>
          </div>
        </Reveal>

        {/* Skills Grid - responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <Reveal
          delay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full lg:max-w-[1200px]"
        >
          {/* Frontend */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
              <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                Frontend
              </span>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="React"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="NextJS"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Vue"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="Angular"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="TypeScript"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
            </CardBody>
          </Card>

          {/* Backend */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
              <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                Backend
              </span>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="Node.js"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Express"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="NestJS"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="PHP"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Laravel"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="GraphQL"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
            </CardBody>
          </Card>

          {/* Database & ORM */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
              <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                Database & ORM
              </span>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="PostgreSQL"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="MySQL"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="MongoDB"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="Redis"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Sequelize"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
            </CardBody>
          </Card>

          {/* Cloud & DevOps */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
              <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                Cloud & DevOps
              </span>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="AWS"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Docker"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="GCP"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="NGINX"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Linux"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="CI/CD"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
            </CardBody>
          </Card>

          {/* Mobile Development */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
              <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                Mobile Development
              </span>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="React Native"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Expo"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="iOS"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="Android"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
            </CardBody>
          </Card>

          {/* AI & LLMs */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
              <span className="text-[var(--accent-gold)] font-inter text-sm lg:text-lg font-semibold">
                AI & LLMs
              </span>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="Claude"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
                <SkillsChip
                  label="OpenAI"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SkillsChip
                  label="Cursor"
                  color="bg-[var(--bg-primary)] text-white font-jetbrains text-[11px] lg:text-xs font-medium px-[10px] lg:px-3 py-1 h-auto rounded-md"
                />
              </div>
            </CardBody>
          </Card>
        </Reveal>
      </section>

      {/* Portfolio Section */}
      <Portfolio />

      {/* Experience Section - responsive */}
      <section
        id="experience"
        className="flex flex-col items-center bg-[var(--bg-primary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
      >
        {/* Header */}
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

        {/* Experience List */}
        <Reveal
          delay={0.15}
          className="flex flex-col gap-4 lg:gap-6 w-full lg:max-w-[1200px]"
        >
          {/* Exp 1 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col lg:flex-row gap-3 lg:gap-6 p-5 lg:p-8">
              {/* Left Column - Logo, Date, Location */}
              <div className="flex flex-col gap-2 lg:w-[200px] lg:flex-shrink-0">
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--bg-primary)]">
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xl font-bold">
                    T
                  </span>
                </div>
                <span className="text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-sm font-medium">
                  Aug 2024 - Present
                </span>
                <span className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                  Utah, USA
                </span>
              </div>
              {/* Right Column - Title, Company, Description, Tags */}
              <div className="flex flex-col gap-2 lg:gap-3 flex-1">
                <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                  Fullstack Developer
                </h3>
                <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                  Techgenies/Dynata
                </p>
                <p className="text-[var(--text-muted)] font-inter text-xs lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6]">
                  Developing Sharpr.com enterprise platform using AWS Bedrock,
                  Cake PHP, React, AngularJS, and PostgreSQL. Building
                  AI-powered features and maintaining large-scale data
                  infrastructure.
                </p>
                {/* Tags - Desktop only */}
                <div className="hidden lg:flex gap-2 mt-1">
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    AWS Bedrock
                  </span>
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    React
                  </span>
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    PostgreSQL
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Exp 2 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col lg:flex-row gap-3 lg:gap-6 p-5 lg:p-8">
              <div className="flex flex-col gap-2 lg:w-[200px] lg:flex-shrink-0">
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--bg-primary)]">
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xl font-bold">
                    O
                  </span>
                </div>
                <span className="text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-sm font-medium">
                  Oct 2022 - Jan 2024
                </span>
                <span className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                  Belgrade, Serbia
                </span>
              </div>
              <div className="flex flex-col gap-2 lg:gap-3 flex-1">
                <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                  Senior Fullstack Engineer
                </h3>
                <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                  Optic Power/CodePwr
                </p>
                <p className="text-[var(--text-muted)] font-inter text-xs lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6]">
                  Built Habiterre farmer platform and Build.org&apos;s Fambiz
                  gamification project. Developed interactive mapping features
                  with Mapbox GL and created engaging user experiences with
                  React and NextJS.
                </p>
                <div className="hidden lg:flex gap-2 mt-1">
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    NextJS
                  </span>
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    Mapbox GL
                  </span>
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    TypeScript
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Exp 3 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col lg:flex-row gap-3 lg:gap-6 p-5 lg:p-8">
              <div className="flex flex-col gap-2 lg:w-[200px] lg:flex-shrink-0">
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--bg-primary)]">
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xl font-bold">
                    C
                  </span>
                </div>
                <span className="text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-sm font-medium">
                  Mar 2019 - Mar 2021
                </span>
                <span className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                  Buenos Aires, AR
                </span>
              </div>
              <div className="flex flex-col gap-2 lg:gap-3 flex-1">
                <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                  Senior Software Engineer
                </h3>
                <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                  Cognizant SoftVision
                </p>
                <p className="text-[var(--text-muted)] font-inter text-xs lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6]">
                  Led frontend teams on corporate website re-architecture and
                  internal tools development. Managed distributed teams across
                  multiple time zones while delivering high-quality enterprise
                  solutions using NextJS, React, NodeJS, and AWS.
                </p>
                <div className="hidden lg:flex gap-2 mt-1">
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    Team Lead
                  </span>
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    NodeJS
                  </span>
                  <span className="text-[var(--accent-gold)] font-jetbrains text-xs font-medium px-[10px] py-1 bg-[var(--bg-primary)] rounded">
                    AWS
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* More Companies */}
          <Card
            className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col items-center gap-3 lg:gap-4 p-5 lg:p-8">
              <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-medium text-center">
                Also collaborated with
              </span>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-10">
                <span className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-semibold">
                  SoulRefiner
                </span>
                <span className="hidden lg:inline text-[var(--bg-tertiary)] font-inter text-lg">
                  |
                </span>
                <span className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-semibold">
                  Lucky Financial
                </span>
                <span className="hidden lg:inline text-[var(--bg-tertiary)] font-inter text-lg">
                  |
                </span>
                <span className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-semibold">
                  WIMET
                </span>
                <span className="hidden lg:inline text-[var(--bg-tertiary)] font-inter text-lg">
                  |
                </span>
                <span className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-semibold">
                  Cablevision
                </span>
                <span className="hidden lg:inline text-[var(--bg-tertiary)] font-inter text-lg">
                  |
                </span>
                <span className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-semibold">
                  Logan Media
                </span>
              </div>
            </CardBody>
          </Card>
        </Reveal>
      </section>

      {/* Education Section - responsive */}
      <section className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]">
        {/* Header */}
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

        {/* Education Cards - 1 col mobile, 2 col desktop */}
        <Reveal
          delay={0.15}
          className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full lg:max-w-[1200px]"
        >
          {/* Education Card 1 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl flex-1"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-5 p-5 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-5">
                <div className="flex items-center justify-center rounded-xl bg-[#FFD70015] h-10 w-10 lg:h-14 lg:w-14 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 lg:w-7 lg:h-7 text-[var(--accent-gold)]" />
                </div>
                <div className="flex flex-col gap-1 lg:gap-2">
                  <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                    Bachelor&apos;s Degree in Computer Science
                  </h3>
                  <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                    Universidad Bicentenaria de Aragua
                  </p>
                  <p className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                    Venezuela
                  </p>
                </div>
              </div>
              <div className="bg-[var(--bg-primary)] text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-[13px] font-medium px-3 py-[6px] rounded-md w-fit">
                Apr 2007 - Oct 2011
              </div>
            </CardBody>
          </Card>

          {/* Education Card 2 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none rounded-xl lg:rounded-2xl flex-1"
            shadow="none"
          >
            <CardBody className="flex flex-col gap-3 lg:gap-5 p-5 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-5">
                <div className="flex items-center justify-center rounded-xl bg-[#FFD70015] h-10 w-10 lg:h-14 lg:w-14 flex-shrink-0">
                  <Award className="w-5 h-5 lg:w-7 lg:h-7 text-[var(--accent-gold)]" />
                </div>
                <div className="flex flex-col gap-1 lg:gap-2">
                  <h3 className="text-white font-inter text-base lg:text-xl font-semibold">
                    Associate&apos;s Degree
                  </h3>
                  <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-base font-medium">
                    IUPFAN/UNEFA
                  </p>
                  <p className="hidden lg:block text-[var(--text-muted)] font-inter text-sm font-normal">
                    Venezuela
                  </p>
                </div>
              </div>
              <div className="bg-[var(--bg-primary)] text-[var(--accent-gold)] font-jetbrains text-[11px] lg:text-[13px] font-medium px-3 py-[6px] rounded-md w-fit">
                Oct 2003 - Oct 2006
              </div>
            </CardBody>
          </Card>
        </Reveal>
      </section>

      {/* Timezone Section - responsive */}
      <section className="flex flex-col items-center bg-[var(--bg-primary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
            <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
              STRATEGIC ADVANTAGE
            </span>
            <h2 className="text-white font-inter text-xl md:text-[28px] lg:text-[42px] font-bold text-center w-full">
              Real-Time Collaboration for US Clients
            </h2>
            <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-lg font-normal text-center w-full">
              Based in Argentina with significant overlapping hours with US time
              zones
            </p>
          </div>
        </Reveal>

        {/* Timezone Cards - responsive: 1 column on mobile, 3 columns on tablet+ */}
        <Reveal
          delay={0.15}
          className="flex flex-col md:flex-row gap-4 lg:gap-8 w-full lg:max-w-[1200px]"
        >
          {/* Card 1 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none md:flex-1 rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col items-center gap-3 lg:gap-4 p-5 lg:p-8">
              <div className="flex items-center justify-center rounded-full bg-[#FFD70020] h-12 w-12 lg:h-16 lg:w-16">
                <Clock4 className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--accent-gold)]" />
              </div>
              <h3 className="text-white font-inter text-base lg:text-xl font-semibold text-center">
                Overlapping Hours
              </h3>
              <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6] text-center w-full">
                4-6 hours of overlap with US Eastern time. When it&apos;s 2-4 PM
                in Argentina, it&apos;s 9 AM-12 PM in New York.
              </p>
            </CardBody>
          </Card>

          {/* Card 2 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none md:flex-1 rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col items-center gap-3 lg:gap-4 p-5 lg:p-8">
              <div className="flex items-center justify-center rounded-full bg-[#FFD70020] h-12 w-12 lg:h-16 lg:w-16">
                <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--accent-gold)]" />
              </div>
              <h3 className="text-white font-inter text-base lg:text-xl font-semibold text-center">
                Real-Time Communication
              </h3>
              <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6] text-center w-full">
                No waiting overnight for responses. Direct collaboration during
                your business hours for faster decisions and project velocity.
              </p>
            </CardBody>
          </Card>

          {/* Card 3 */}
          <Card
            className="bg-[var(--bg-tertiary)] border-none md:flex-1 rounded-xl lg:rounded-2xl"
            shadow="none"
          >
            <CardBody className="flex flex-col items-center gap-3 lg:gap-4 p-5 lg:p-8">
              <div className="flex items-center justify-center rounded-full bg-[#FFD70020] h-12 w-12 lg:h-16 lg:w-16">
                <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-[var(--accent-gold)]" />
              </div>
              <h3 className="text-white font-inter text-base lg:text-xl font-semibold text-center">
                Faster Turnaround
              </h3>
              <p className="text-[var(--text-secondary)] font-inter text-[13px] lg:text-[15px] font-normal leading-[1.5] lg:leading-[1.6] text-center w-full">
                Same-day iterations and quick feedback loops. No off-hours work
                required from either party.
              </p>
            </CardBody>
          </Card>
        </Reveal>
      </section>

      {/* Contact Section - responsive */}
      <section
        id="contact"
        className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
      >
        {/* "Let's Build Something Great" Card */}
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
                I&apos;m currently available for freelance work and new
                opportunities. Let&apos;s discuss how I can help bring your
                ideas to life with clean, scalable code.
              </p>

              {/* Contact Buttons - responsive: vertical on mobile, horizontal on tablet+ */}
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
                  onPress={() =>
                    window.open(
                      "https://calendly.com/tblancog/1-hour-meeting",
                      "_blank"
                    )
                  }
                >
                  <Calendar className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-[var(--accent-gold)]" />
                  Schedule a Call
                </Button>
              </div>
            </CardBody>
          </Card>
        </Reveal>

        {/* Contact Form - Always visible below the card */}
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
                Fill out the form below and I&apos;ll get back to you within 24
                hours.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* Footer - responsive */}
      <footer className="flex flex-col items-center bg-[var(--bg-primary)] gap-6 lg:gap-8 px-5 md:px-10 lg:px-[120px] py-8 lg:py-12">
        {/* Footer Top - responsive: centered stack on mobile, space-between on tablet+ */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 w-full">
          {/* Logo */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
            <span className="text-[var(--accent-gold)] font-jetbrains text-xl lg:text-2xl font-bold">
              <Image
                src="/assets/avatar.jpg"
                alt="Tony Blanco"
                width={32}
                height={32}
              />
            </span>
            <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal">
              Full Stack Engineer
            </span>
          </div>

          {/* Social - Fixed to match hero section style */}
          <div className="flex gap-3 lg:gap-4">
            <a
              href="https://github.com/tblancog"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
            >
              <Github className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
            </a>
            <a
              href="https://linkedin.com/in/tblancog"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="flex items-center justify-center rounded-lg bg-[var(--bg-primary)] border border-[var(--text-muted)] h-10 w-10 lg:h-11 lg:w-11 hover:border-[var(--accent-gold)] transition-colors"
            >
              <Linkedin className="w-5 h-5 lg:w-[22px] lg:h-[22px] text-[var(--text-secondary)]" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--bg-tertiary)] w-full" />

        {/* Footer Bottom - responsive: centered stack on mobile, space-between on tablet+ */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 w-full">
          <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal text-center">
            2026 Tony Blanco. All rights reserved.
          </span>
          <span className="text-[var(--text-muted)] font-inter text-xs lg:text-sm font-normal text-center">
            Buenos Aires, Argentina
          </span>
        </div>
      </footer>
    </main>
  );
}
