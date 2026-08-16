import Splash from "@/components/Splash";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";
import Funnels from "@/components/sections/Funnels";
import WhyJoshVantage from "@/components/sections/WhyJoshVantage";
import ValueAreas from "@/components/sections/ValueAreas";
import Method from "@/components/sections/Method";
import Founder from "@/components/sections/Founder";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
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
          <WhyJoshVantage />
          <Funnels />
        </div>
        {/* z-10 so the sticky silk stage can never bleed over these sections */}
        <div className="relative z-10">
          <ValueAreas />
          <Method />
          <Founder />
          {/* Written client reviews — renders once genuine reviews are supplied */}
          <Reviews />
          <Faq />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
