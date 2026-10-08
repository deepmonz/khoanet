import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { WorkGrid } from "./work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Track record: Flomrg and the other systems I have designed and built — flower industry, business software, marketplaces and AI automation.",
};

export default function WorkPage() {
  return (
    <section className="relative isolate mx-auto max-w-6xl px-4 pt-36 pb-28 sm:px-6">
      <div className="bg-grid mask-fade-radial absolute inset-x-0 top-0 -z-10 h-[480px]" />
      <SectionHeading
        eyebrow="Work"
        title={
          <>
            Track <span className="text-gradient">record.</span>
          </>
        }
        body="Everything I've designed and built end to end, starting with the software that runs my own flower businesses."
      />
      <WorkGrid />
    </section>
  );
}
