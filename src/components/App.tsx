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
import { GoogleAdUnit } from "./ui/GoogleAdUnit";

export function App() {
  return (
    <main id="main-content" className="relative w-full overflow-x-hidden min-h-screen bg-[#f4f2ee]">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Certifications />
      <Experience />
      <Achievements />
      
      {/* Google AdSense Unit */}
      <section aria-label="Sponsored Content" className="w-full bg-[#f4f2ee] border-t border-[#0d0d0d]/10 py-6">
        <div className="section-container">
          <GoogleAdUnit
            client="ca-pub-4049435921186193"
            slot="1554546740"
            format="auto"
            responsive={true}
          />
        </div>
      </section>

      <Contact />
    </main>
  );
}
