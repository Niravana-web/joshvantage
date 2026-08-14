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
        <Hero />
        <Funnels />
        <ValueAreas />
        <Method />
        <Faq />
        <Insights />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
