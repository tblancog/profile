"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { SkillsChip } from "@/components/SkillsChip";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/content/project";

const chipColor = "bg-[var(--bg-primary)]";

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const activePointer = useRef<number | null>(null);
  const swiped = useRef(false);
  const statusId = useId();
  const total = projects.length;

  const goTo = (next: number) => {
    if (total === 0) return;
    setIndex(((next % total) + total) % total);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select, a, button")) return;

    let next: number | null = null;
    if (event.key === "ArrowRight") next = index + 1;
    else if (event.key === "ArrowLeft") next = index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = total - 1;
    if (next == null) return;

    event.preventDefault();
    goTo(next);
    regionRef.current?.focus();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX.current = event.clientX;
    activePointer.current = event.pointerId;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current == null || activePointer.current !== event.pointerId) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    activePointer.current = null;
    if (Math.abs(delta) < 48) return;
    swiped.current = true;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  const openProject = (project: Project) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setSelected(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <>
      <section
        id="portfolio"
        ref={regionRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Projects"
        onKeyDown={onKeyDown}
        className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-gold)]"
      >
        <Reveal>
          <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
            <span className="text-[var(--accent-gold)] font-jetbrains text-[10px] lg:text-xs font-semibold tracking-[2px]">
              PROJECT PORTFOLIO
            </span>
            <h2 className="text-white font-inter text-2xl md:text-[32px] lg:text-[42px] font-bold text-center">
              Featured Work Samples
            </h2>
            <p className="text-[var(--text-secondary)] font-inter text-sm lg:text-lg font-normal text-center max-w-[700px]">
              A selection of projects demonstrating my expertise across various
              technologies
            </p>
          </div>
        </Reveal>

        {total === 0 ? (
          <p className="text-[var(--text-secondary)] font-inter text-sm text-center">
            No published projects yet.
          </p>
        ) : (
          <div className="flex w-full lg:max-w-[1200px] flex-col items-center gap-6">
            <p className="sr-only">
              {`Carousel with ${total} projects. Previous and next buttons, or left and right arrow keys while this section is focused, change the project.`}
            </p>
            <p id={statusId} className="sr-only" aria-live="polite">
              {`Project ${index + 1} of ${total}: ${projects[index]?.title ?? ""}`}
            </p>

            <div className="overflow-hidden w-full" ref={trackRef}>
              <div
                className="flex w-full carousel-track touch-pan-y"
                style={{ transform: `translateX(-${index * 100}%)` }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => {
                  startX.current = null;
                  activePointer.current = null;
                }}
              >
                {projects.map((project, slideIndex) => {
                  const active = slideIndex === index;
                  return (
                    <div
                      key={project.slug}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${slideIndex + 1} of ${total}: ${project.title}`}
                      aria-hidden={active ? undefined : true}
                      inert={active ? undefined : true}
                      className="w-full shrink-0 basis-full min-w-0 flex justify-center"
                    >
                      <Card
                        isPressable
                        onPress={() => openProject(project)}
                        className="portfolio-card bg-[#1a2332] border-none rounded-xl hover:bg-[#1f2937] transition-colors cursor-pointer group w-full max-w-[420px]"
                        shadow="none"
                      >
                        <CardBody className="flex flex-col gap-4 p-6">
                          <div className="relative flex items-end w-full h-32 rounded-lg bg-[#0f1621] overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.imageAlt}
                              fill
                              unoptimized
                              sizes="420px"
                              className="object-cover"
                            />
                            <div className="relative z-10 w-full bg-gradient-to-t from-[#0f1621] via-[#0f1621]/70 to-transparent px-3 pb-2 pt-8">
                              {project.imagePlaceholder ? (
                                <span className="block text-[var(--accent-gold)] font-jetbrains text-[10px] font-medium tracking-[2px]">
                                  PLACEHOLDER
                                </span>
                              ) : null}
                              <p className="text-white font-inter text-sm font-semibold leading-tight">
                                {project.title}
                              </p>
                            </div>
                          </div>

                          <h3 className="text-white font-inter text-lg font-semibold leading-tight">
                            {project.title}
                          </h3>

                          <p className="text-[var(--text-secondary)] font-inter text-sm font-normal">
                            {project.stack.join(" / ")}
                          </p>

                          <p className="text-[var(--text-muted)] font-inter text-xs leading-relaxed line-clamp-2">
                            {project.summary || project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.stack.map((tag) => (
                              <SkillsChip key={tag} label={tag} color={chipColor} />
                            ))}
                          </div>

                          <span className="text-[var(--accent-gold)] font-inter text-sm font-medium text-left group-hover:underline mt-2 pointer-events-none">
                            View Details →
                          </span>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--text-muted)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <span
                  className="min-w-[4.5rem] text-center text-[var(--text-secondary)] font-jetbrains text-sm"
                  aria-hidden="true"
                >
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--text-muted)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {projects.map((project, slideIndex) => {
                  const selectedDot = slideIndex === index;
                  return (
                    <button
                      key={project.slug}
                      type="button"
                      onClick={() => goTo(slideIndex)}
                      aria-label={`Show ${project.title}`}
                      aria-current={selectedDot ? "true" : undefined}
                      className={`h-2 rounded-full ${
                        selectedDot
                          ? "w-6 bg-[var(--accent-gold)]"
                          : "w-2 bg-[var(--text-muted)] hover:bg-[var(--text-secondary)]"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="2xl"
        scrollBehavior="inside"
        disableAnimation
        hideCloseButton
        classNames={{
          base: "bg-transparent",
          backdrop: "bg-black/60",
          wrapper: "items-center justify-center",
        }}
      >
        <ModalContent className="bg-[#1a2332] rounded-2xl max-w-[600px] m-4 max-h-[90vh]">
          {() => (
            <>
              <ModalHeader className="flex items-center justify-between px-6 py-4 border-b border-[#0f1621] sticky top-0 bg-[#1a2332] z-50">
                <span className="text-white font-inter text-lg font-semibold">
                  Project Details
                </span>
                <button
                  onClick={closeModal}
                  className="text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </ModalHeader>

              <ModalBody className="px-6 py-6 flex flex-col gap-5">
                {selected ? (
                  <>
                    <div className="relative flex items-end w-full h-40 rounded-lg bg-[#0f1621] overflow-hidden">
                      <Image
                        src={selected.image}
                        alt={selected.imageAlt}
                        fill
                        unoptimized
                        sizes="600px"
                        className="object-cover"
                      />
                      <div className="relative z-10 w-full bg-gradient-to-t from-[#0f1621] via-[#0f1621]/70 to-transparent px-4 pb-3 pt-10">
                        {selected.imagePlaceholder ? (
                          <span className="block text-[var(--accent-gold)] font-jetbrains text-[10px] font-medium tracking-[2px]">
                            PLACEHOLDER
                          </span>
                        ) : null}
                        <p className="text-white font-inter text-lg font-semibold">
                          {selected.title}
                        </p>
                      </div>
                    </div>

                    {selected.category ? (
                      <span className="text-[var(--text-muted)] font-jetbrains text-[10px] tracking-[2px] uppercase">
                        {selected.category}
                      </span>
                    ) : null}

                    <h3 className="text-white font-inter text-2xl font-bold leading-tight -mt-2">
                      {selected.title}
                    </h3>

                    {selected.role ? (
                      <p className="text-[var(--text-secondary)] font-inter text-sm font-medium -mt-2">
                        {selected.role}
                      </p>
                    ) : null}

                    <div>
                      <span className="text-[var(--accent-gold)] font-inter text-sm font-medium">
                        {selected.stack.join(" / ")}
                      </span>
                    </div>

                    <p className="text-[var(--text-secondary)] font-inter text-sm leading-relaxed">
                      {selected.description || selected.summary}
                    </p>

                    <div className="flex flex-col gap-2 py-6">
                      <span className="text-[var(--accent-gold)] font-jetbrains text-xs tracking-[1px] uppercase">
                        Technologies Built With
                      </span>
                      <div className="flex flex-wrap gap-2 py-2">
                        {selected.stack.map((tag) => (
                          <SkillsChip
                            key={tag}
                            label={tag}
                            color="bg-[var(--bg-primary)] font-jetbrains text-[10px] font-medium px-3 py-1 h-auto rounded-md"
                          />
                        ))}
                      </div>
                    </div>

                    {isHttpUrl(selected.links.live) || isHttpUrl(selected.links.repo) ? (
                      <div className="flex flex-wrap gap-3">
                        {isHttpUrl(selected.links.live) ? (
                          <a
                            href={selected.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2 font-inter text-sm font-semibold text-[var(--bg-primary)]"
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            Visit live site
                          </a>
                        ) : null}
                        {isHttpUrl(selected.links.repo) ? (
                          <a
                            href={selected.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent-gold)] px-4 py-2 font-inter text-sm font-semibold text-[var(--accent-gold)]"
                          >
                            <Github className="w-4 h-4" aria-hidden="true" />
                            View repository
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
