import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";

const POSTS = [
  {
    tag: "LAUNCH",
    date: "/AUG 02, 2026",
    title: "The foundations CQC expects before you apply",
    grad: "linear-gradient(135deg, #0b153f, #35459c)",
  },
  {
    tag: "GROWTH",
    date: "/JUL 15, 2026",
    title: "Why capable providers still lose tenders",
    grad: "linear-gradient(135deg, #13226a, #6f83c9)",
  },
  {
    tag: "ACADEMY",
    date: "/JUN 28, 2026",
    title: "Why experience alone is not enough for RM roles",
    grad: "linear-gradient(135deg, #060d24, #4a5cb0)",
  },
];

export default function Insights() {
  return (
    <section id="results" className="bg-white px-6 py-28 text-[#181815] md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <SectionHead eyebrow="NEWS" title="Latest insights" />
          <a
            href="#"
            className="hidden shrink-0 items-center gap-3 border border-black/10 px-5 py-3 text-sm font-medium transition-colors hover:bg-black/5 md:flex"
          >
            Discover more <span aria-hidden>&#8599;</span>
          </a>
        </div>
        <Reveal stagger={0.12} className="mt-14 grid gap-8 md:grid-cols-3">
          {POSTS.map((post) => (
            <a key={post.title} href="#" className="group block">
              <div
                className="notch-card aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ background: post.grad }}
              />
              <div className="eyebrow-mono mt-4 flex items-center justify-between text-[13px]">
                <span>&#9642; {post.tag}</span>
                <span className="text-[#8a8a83]">{post.date}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:underline">
                {post.title}
              </h3>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
