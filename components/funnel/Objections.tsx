import Reveal from "@/components/Reveal";

/* Three objection blocks — the "we hear you" row on each funnel page. */
export default function Objections({
  items,
  transition,
}: {
  items: { q: string; a: string }[];
  /* Optional closing line under the three cards, bridging into the next
     section rather than leaving the objections hanging. */
  transition?: string;
}) {
  return (
    <section className="bg-[#f7f7f5] px-6 py-24 text-[#181815] md:px-12">
      <Reveal stagger={0.12} className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.q} className="border border-black/5 bg-white p-8">
            <h3 className="text-xl font-semibold tracking-tight">{item.q}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4c4c47]">
              {item.a}
            </p>
          </article>
        ))}
      </Reveal>
      {transition && (
        <Reveal className="mx-auto mt-12 max-w-6xl">
          <p
            className="text-center text-2xl font-medium text-[#181815] md:text-3xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {transition}
          </p>
        </Reveal>
      )}
    </section>
  );
}
