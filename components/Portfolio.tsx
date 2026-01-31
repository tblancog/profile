"use client";

import {
  Card,
  CardBody,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { TrendingUp, MapPin, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { SkillsChip } from "./SkillsChip";

interface Project {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  techStack: string;
  description: string;
  tags: Array<string>;
}

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "analytics",
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Enterprise Analytics Platform",
      category: "ENTERPRISE / SAAS",
      techStack: "React.js / AWS Bedrock",
      description:
        "A comprehensive enterprise analytics platform that leverages AWS Bedrock for advanced AI-powered insights. Built with a modern React architecture, the platform handles massive datasets and provides real-time analytics for enterprise clients. Features include predictive analytics, custom dashboards, and automated reporting systems that scale to millions of data points.",
      tags: ["React", "AWS Bedrock", "PostgreSQL"],
    },
    {
      id: "mapping",
      icon: <MapPin className="w-12 h-12" />,
      title: "Agricultural Mapping Platform",
      category: "GEOSPATIAL / AGTECH",
      techStack: "Next.js / Mapbox GL",
      description:
        "Interactive farming platform with deep Mapbox GL integration for real-time field data visualization and precision agriculture. The platform enables farmers to monitor crop health, optimize irrigation schedules, and manage resources efficiently through advanced geospatial analytics. Features include satellite imagery integration, weather data overlays, and predictive crop yield modeling.",
      tags: ["Mapbox GL", "React.js", "Node.js"],
    },
    {
      id: "gamification",
      icon: <ImageIcon className="w-12 h-12" />,
      title: "Gamification Learning Platform",
      category: "EDTECH / GAMIFICATION",
      techStack: "React.js / Node.js",
      description:
        "Educational technology platform that uses gamification principles to create engaging learning experiences for youth entrepreneurship. Built for Build.org, the platform features interactive challenges, achievement systems, and social learning components. Students progress through entrepreneurship fundamentals while earning badges, competing on leaderboards, and collaborating with peers.",
      tags: ["React", "TypeScript", "Firebase"],
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

        {/* Projects Grid - Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:max-w-[1200px]">
          {projects.map((project) => (
            <Card
              key={project.id}
              isPressable
              onPress={() => handleProjectClick(project)}
              className="bg-[#1a2332] border-none rounded-xl hover:bg-[#1f2937] transition-colors cursor-pointer group"
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

                {/* Description - truncated */}
                <p className="text-[var(--text-muted)] font-inter text-xs leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, index) => (
                    <SkillsChip
                      label={tag}
                      key={index}
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
