import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import SectionSkeleton from "@/components/SectionSkeleton";

const Skills = dynamic(() => import('@/components/Skills'), { ssr: true, loading: () => <SectionSkeleton /> });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true, loading: () => <SectionSkeleton /> });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true, loading: () => <SectionSkeleton /> });
const Reviews = dynamic(() => import('@/components/Reviews'), { ssr: true, loading: () => <SectionSkeleton /> });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true, loading: () => <SectionSkeleton /> });

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Reviews />
      <Contact />
    </div>
  );
}
