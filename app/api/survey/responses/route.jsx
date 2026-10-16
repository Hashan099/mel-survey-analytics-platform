import { adminAuth } from "../../../../Firebase/firebaseAdmin";
import {
  readOnlyClientPromise,
  readWriteClientPromise,
} from "../../../../mongodb/mongodb";
import { DemoResponses } from "../../../../SurveyConfigs/DemoResponses";

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ── DEMO MODE BYPASS ──────────────────────────────────────────────────────
  if (req.headers.get("x-demo-mode") === "true") {
    return new Response("Demo: Survey submitted successfully", { status: 200 });
  }
  // ─────────────────────────────────────────────────────────────────────────

  const authHeader = req.headers.get("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;

  if (!token) {
    return new Response("Unauthorized, invalid or missing authorization token", { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log("Token verified for user:", decodedToken.uid);

  /*   // Optional: Check if the user has a specific role
    if (!decodedToken.roles || !decodedToken.roles.includes("admin")) {
      return new Response("Forbidden", { status: 403 });
    } */

    const { surveyData, surveyID } = await req.json();
    const client = await readWriteClientPromise;
    const db = client.db("mel-nld");

    const existingSurvey = await db
      .collection("survey_responses")
      .findOne({ _id: surveyID });
    if (existingSurvey) {
      return new Response("Survey already submitted", { status: 409 });
    }

    await db.collection("survey_responses").insertOne({
      _id: surveyID,
      ...surveyData,
    });

    return new Response("Survey submitted successfully", { status: 200 });
  } catch (error) {
    console.error("Error verifying token or inserting survey:", error);
    return new Response("Invalid session token or error processing request", {
      status: 401,
    });
  }
}

export async function GET(req) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ── DEMO MODE BYPASS ──────────────────────────────────────────────────────
  if (req.headers.get("x-demo-mode") === "true") {
    return new Response(JSON.stringify(DemoResponses), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  // ─────────────────────────────────────────────────────────────────────────

  const authHeader = req.headers.get("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;

  if (!token) {
    return new Response("Unauthorized, invalid or missing authorization token", { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log("Token verified for user:", decodedToken.uid);

    /* // Optional: Check if the user has a specific role
    if (!decodedToken.roles || !decodedToken.roles.includes("viewer")) {
      return new Response("Forbidden", { status: 403 });
    }
 */
    const client = await readOnlyClientPromise;
    const db = client.db("mel-nld");

    const surveyResponses = await db
      .collection("survey_responses")
      .find()
      .toArray();
    return new Response(JSON.stringify(surveyResponses), { status: 200 });
  } catch (error) {
    console.error("Error verifying token or fetching survey responses:", error);
    return new Response("Invalid session token or error processing request", {
      status: 401,
    });
  }
}
