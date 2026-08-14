import { NextResponse } from "next/server";
import { getMongo, DB_NAME } from "@/lib/mongo";

const FUNNELS = new Set(["launch", "growth", "academy"]);

export async function POST(req: Request) {
  let body: { funnel?: string; answers?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { funnel, answers } = body;
  if (!funnel || !FUNNELS.has(funnel)) {
    return NextResponse.json({ error: "Unknown funnel" }, { status: 400 });
  }
  if (!answers || typeof answers !== "object" || !answers.email?.trim()) {
    return NextResponse.json({ error: "Missing answers" }, { status: 400 });
  }

  // Only keep flat string values; cap sizes so the endpoint can't be abused.
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(answers)) {
    if (typeof v === "string" && k.length <= 64) {
      clean[k] = v.slice(0, 2000);
    }
  }

  try {
    const client = await getMongo();
    const result = await client
      .db(DB_NAME)
      .collection("leads")
      .insertOne({ funnel, answers: clean, createdAt: new Date() });
    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error("lead insert failed", err);
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
