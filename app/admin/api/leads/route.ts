import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongo, DB_NAME } from "@/lib/mongo";

/* Admin lead management. Lives under /admin so the Basic-auth proxy
   guards it alongside the dashboard page. */

async function collection() {
  const client = await getMongo();
  return client.db(DB_NAME).collection("leads");
}

export async function GET() {
  try {
    const col = await collection();
    const leads = await col.find({}).sort({ createdAt: -1 }).limit(500).toArray();
    return NextResponse.json({
      leads: leads.map((l) => ({
        id: l._id.toString(),
        funnel: l.funnel,
        answers: l.answers ?? {},
        createdAt: l.createdAt ?? null,
        archived: Boolean(l.archived),
      })),
    });
  } catch {
    return NextResponse.json({ error: "database unavailable" }, { status: 503 });
  }
}

function parseId(id: unknown): ObjectId | null {
  try {
    return typeof id === "string" ? new ObjectId(id) : null;
  } catch {
    return null;
  }
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  const _id = parseId(body?.id);
  if (!_id || typeof body?.archived !== "boolean") {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
  try {
    const col = await collection();
    await col.updateOne({ _id }, { $set: { archived: body.archived } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "database unavailable" }, { status: 503 });
  }
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  const _id = parseId(body?.id);
  if (!_id) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
  try {
    const col = await collection();
    await col.deleteOne({ _id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "database unavailable" }, { status: 503 });
  }
}
