import Reveal from "@/components/Reveal";

/* Three objection blocks — the "we hear you" row on each funnel page. */
export default function Objections({
  items,
}: {
  items: { q: string; a: string }[];
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
    </section>
  );
}
