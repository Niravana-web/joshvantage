/*
 * Renders a JSON-LD graph node into the page. A native <script> is correct
 * here rather than next/script: this is data for crawlers, not code to
 * execute or defer.
 *
 * `<` is escaped to its unicode form so no string that ever reaches a schema
 * field can close the script tag.
 */
export default function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\u003c"),
      }}
    />
  );
}
