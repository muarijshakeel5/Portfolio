import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Skills />
      <Projects />
      <Terminal />
      <Experience />
      <Reviews />
      <Contact />
    </div>
  );
}
