import Splash from "@/components/Splash";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";
import Funnels from "@/components/sections/Funnels";
import ValueAreas from "@/components/sections/ValueAreas";
import Method from "@/components/sections/Method";
import Faq from "@/components/sections/Faq";
import Insights from "@/components/sections/Insights";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Splash />
        {/* One tall silk canvas that scrolls WITH the page: the hero sits on
            the silk-rich top, then the same surface continues down through
            Your Journey, the texture fading into brand navy. */}
        <div className="relative">
          <div className="silk-span" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-silk.webp" alt="" className="silk-span-img" />
            <div className="silk-mirror">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero-silk.webp" alt="" />
            </div>
            <div className="silk-hero-layer">
              <div className="silk-blob b1" />
              <div className="silk-blob b2" />
              <div className="silk-blob b3" />
              <div className="silk-blob b4" />
            </div>
          </div>
          <Hero />
          <Funnels />
        </div>
        {/* z-10 so the sticky silk stage can never bleed over these sections */}
        <div className="relative z-10">
          <ValueAreas />
          <Method />
          <Faq />
          <Insights />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
