import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { WorkGrid } from "./work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: flower-industry platforms, ERPs, marketplaces, AI automation and mobile games.",
};

export default function WorkPage() {
  return (
    <section className="relative isolate mx-auto max-w-6xl px-4 pt-36 pb-28 sm:px-6">
      <div className="bg-grid mask-fade-radial absolute inset-x-0 top-0 -z-10 h-[480px]" />
      <SectionHeading
        eyebrow="Work"
        title={
          <>
            Projects &amp; <span className="text-gradient">case studies.</span>
          </>
        }
        body="Systems I've designed and built end to end — from data model to deployment. Client names are withheld where required."
      />
      <WorkGrid />
    </section>
  );
}
