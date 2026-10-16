import {
  readOnlyClientPromise,
  readWriteClientPromise,
} from "../../../../mongodb/mongodb";
import { ObjectId } from "mongodb";
import { adminAuth } from "../../../../Firebase/firebaseAdmin";
import { DemoSurvey } from "../../../../SurveyConfigs/DemoSurvey";

async function validateToken(req) {
  const authHeader = req.headers.get("authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;

  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const decodedToken = await adminAuth.verifyIdToken(token);
  return decodedToken;
}

export async function GET(req) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ── DEMO MODE BYPASS ──────────────────────────────────────────────────────
  // When x-demo-mode header is present, return static demo data immediately.
  // No Firebase token or MongoDB required. Real users are unaffected.
  if (req.headers.get("x-demo-mode") === "true") {
    return new Response(JSON.stringify(DemoSurvey), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  // ─────────────────────────────────────────────────────────────────────────

  try {
    await validateToken(req);
    const client = await readOnlyClientPromise;
    const db = client.db("mel-nld");
    const doc = await db.collection("survey_questions").findOne({
      _id: new ObjectId("672b2730d5eed612c7b581fe"),
    });

    if (doc) {
      return new Response(JSON.stringify(doc), { status: 200 });
    } else {
      return new Response("Document not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    const errorMessage = error.message || "Error fetching document";
    return new Response(errorMessage, {
      status: errorMessage.includes("Unauthorized") ? 401 : 500,
    });
  }
}

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ── DEMO MODE BYPASS ──────────────────────────────────────────────────────
  if (req.headers.get("x-demo-mode") === "true") {
    return new Response("Demo: Survey updated successfully", { status: 200 });
  }
  // ─────────────────────────────────────────────────────────────────────────

  try {
    const decodedToken = await validateToken(req);
    const client = await readWriteClientPromise;
    const db = client.db("mel-nld");

    const data = await req.json();
    const updatedDoc = await db.collection("survey_questions").updateOne(
      { _id: new ObjectId("672b2730d5eed612c7b581fe") },
      { $set: data }
    );

    if (updatedDoc.modifiedCount > 0) {
      return new Response("Document updated successfully", { status: 200 });
    } else {
      return new Response("Failed to update document", { status: 500 });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    const errorMessage = error.message || "Error updating document";
    return new Response(errorMessage, {
      status: errorMessage.includes("Unauthorized") ? 401 : 500,
    });
  }
}
