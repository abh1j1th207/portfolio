import React from "react";
import { Navigation } from "./Navigation";
import { Hero } from "./hero/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Certifications } from "./sections/Certifications";
import { Experience } from "./sections/Experience";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";

export function App() {
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen bg-[#f4f2ee]">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Certifications />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
