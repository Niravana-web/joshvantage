export default function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-head">
      <div className="rule" />
      <p className="eyebrow-mono">/{eyebrow}</p>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
        {intro && (
          <p className="max-w-md text-base leading-relaxed text-[#4c4c47]">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
