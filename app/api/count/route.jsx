import { readOnlyClientPromise } from "../../../mongodb/mongodb";
import { DemoResponses } from "../../../SurveyConfigs/DemoResponses";

export async function GET(req) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  // ── DEMO MODE BYPASS ──────────────────────────────────────────────────────
  if (req.headers.get("x-demo-mode") === "true") {
    return new Response(JSON.stringify(DemoResponses.length), { status: 200 });
  }
  // ─────────────────────────────────────────────────────────────────────────

  try {
    const client = await readOnlyClientPromise;
    const db = client.db("mel-nld");
    const count = await db.collection("survey_responses").countDocuments();
    return new Response(JSON.stringify(count), { status: 200 });
  } catch (error) {
    console.error("Error getting document count:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
