import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CinematicBackground } from "@/components/portfolio/CinematicBackground";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Certificates } from "@/components/portfolio/Certificates";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { WhatsAppButton } from "@/components/portfolio/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <ScrollProgress />
      <CinematicBackground />
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
