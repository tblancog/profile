"use client";

import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { TrendingUp, MapPin, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { SkillsChip } from "./SkillsChip";
import { Reveal } from "./Reveal";

interface Project {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  techStack: string;
  description: string;
  tags: Array<string>;
  impact: string;
}

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "jssi",
      icon: <TrendingUp className="w-12 h-12" />,
      title: "JSSI/ANTE Aircraft Asset Planner",
      category: "AVIATION / MAINTENANCE",
      techStack: "React / C#.NET / Azure DevOps",
      description:
        "Enterprise maintenance scheduling application for JSSI — a global aviation services company. The platform manages aircraft engine inspection and overhaul workflows, tracking assets through maintenance phases before reassignment. Integrated React frontend with a C#/.NET backend via Azure DevOps CI/CD pipelines, optimizing scheduling workflows to reduce operational costs for aircraft asset management.",
      tags: ["React", "C#/.NET", "Azure DevOps"],
      impact: "Reduces maintenance operational costs",
    },
    {
      id: "habiterre",
      icon: <MapPin className="w-12 h-12" />,
      title: "Habiterre Farmer Platform",
      category: "GEOSPATIAL / AGTECH",
      techStack: "React / Mapbox GL / TypeScript",
      description:
        "Interactive precision agriculture platform built from scratch with deep Mapbox GL integration for real-time field data visualization. The platform enables farmers to monitor crop health, manage irrigation schedules, and track resources through advanced geospatial analytics. Features include satellite imagery overlays, field boundary management, and data-driven recommendations for yield optimization.",
      tags: ["Mapbox GL", "React", "TypeScript"],
      impact: "Serves 500+ active farmers",
    },
    {
      id: "uoppa",
      icon: <ImageIcon className="w-12 h-12" />,
      title: "Uoppa — Merchant Deal App",
      category: "MOBILE / MARKETPLACE",
      techStack: "React Native / Expo",
      description:
        "React Native mobile app for Uoppa, a merchant deal discovery platform targeting the São Paulo market. Built and delivered the full mobile experience using React Native and Expo, integrating with backend APIs for deal browsing, merchant profiles, and user engagement features. The app successfully reached publishing on both App Store and Google Play, completing the full mobile delivery lifecycle.",
      tags: ["React Native", "Expo", "TypeScript"],
      impact: "Published on App Store & Google Play",
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section
        id="portfolio"
        className="flex flex-col items-center bg-[var(--bg-secondary)] gap-8 lg:gap-12 px-5 md:px-10 lg:px-[120px] py-[60px] md:py-20 lg:py-[100px]"
      >
        {/* Header */}
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

        {/* Projects Grid - Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:max-w-[1200px]">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <Card
                isPressable
                onPress={() => handleProjectClick(project)}
                className="bg-[#1a2332] border-none rounded-xl hover:bg-[#1f2937] transition-colors cursor-pointer group h-full"
                shadow="none"
              >
                <CardBody className="flex flex-col gap-4 p-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-full h-32 rounded-lg bg-[#0f1621] text-[var(--accent-gold)] group-hover:scale-105 transition-transform">
                    {project.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-inter text-lg font-semibold leading-tight">
                    {project.title}
                  </h3>

                  {/* Tech Stack */}
                  <p className="text-[var(--text-secondary)] font-inter text-sm font-normal">
                    {project.techStack}
                  </p>

                  {/* Impact Badge */}
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--success)]" />
                    <span className="text-[var(--success)] font-jetbrains text-xs font-medium">
                      {project.impact}
                    </span>
                  </div>

                  {/* Description - truncated */}
                  <p className="text-[var(--text-muted)] font-inter text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <SkillsChip
                        label={tag}
                        key={i}
                        color={`bg-[var(--bg-primary)]`}
                      />
                    ))}
                  </div>

                  {/* View Details Link */}
                  <span className="text-[var(--accent-gold)] font-inter text-sm font-medium text-left group-hover:underline mt-2 pointer-events-none">
                    View Details →
                  </span>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="2xl"
        scrollBehavior="inside"
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
                  onClick={handleCloseModal}
                  className="text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </ModalHeader>

              <ModalBody className="px-6 py-6 flex flex-col gap-5">
                {selectedProject && (
                  <>
                    {/* Icon Section */}
                    <div className="flex items-center justify-center w-full h-40 rounded-lg bg-[#0f1621] text-[var(--accent-gold)]">
                      {selectedProject.icon}
                    </div>

                    {/* Category */}
                    <span className="text-[var(--text-muted)] font-jetbrains text-[10px] tracking-[2px] uppercase">
                      {selectedProject.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-white font-inter text-2xl font-bold leading-tight -mt-2">
                      {selectedProject.title}
                    </h3>

                    {/* Tech Stack */}
                    <div>
                      <span className="text-[var(--accent-gold)] font-inter text-sm font-medium">
                        {selectedProject.techStack}
                      </span>
                    </div>

                    {/* Impact */}
                    <div className="flex items-center gap-2 bg-[var(--success)]/10 px-3 py-2 rounded-lg w-fit">
                      <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                      <span className="text-[var(--success)] font-jetbrains text-sm font-medium">
                        {selectedProject.impact}
                      </span>
                    </div>

                    {/* ID/Reference */}
                    <span className="text-[var(--text-muted)] font-jetbrains text-xs">
                      #{selectedProject.id}
                    </span>

                    {/* Full Description */}
                    <p className="text-[var(--text-secondary)] font-inter text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Technologies Section */}
                    <div className="flex flex-col gap-2 py-6">
                      <span className="text-[var(--accent-gold)] font-jetbrains text-xs tracking-[1px] uppercase">
                        Technologies Built With
                      </span>
                      <div className="flex flex-wrap gap-2 py-2">
                        {selectedProject.tags.map((tag) => (
                          <SkillsChip
                            key={tag}
                            label={tag}
                            color="bg-[var(--bg-primary)] font-jetbrains text-[10px] font-medium px-3 py-1 h-auto rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
