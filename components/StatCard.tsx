"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { Card, CardBody } from "@heroui/react";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState("0");

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayValue(current + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, suffix]);

  return (
    <div ref={ref} className="flex-1">
      <Card
        className="bg-[var(--bg-tertiary)] border-none rounded-xl h-full"
        shadow="none"
      >
        <CardBody className="flex flex-col items-center lg:items-start gap-1 lg:gap-2 p-4 lg:p-6">
          <span className="text-[var(--accent-gold)] font-jetbrains text-[28px] lg:text-4xl font-bold">
            {displayValue}
          </span>
          <span className="text-[var(--text-secondary)] font-inter text-[11px] lg:text-sm font-normal lg:font-medium text-center lg:text-left">
            {label}
          </span>
        </CardBody>
      </Card>
    </div>
  );
}
