import { adminAuth } from "../../../../Firebase/firebaseAdmin";

export async function POST(req) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

  if (!token) {
    return new Response("No token provided", { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log("Token verified for user:", decodedToken.uid);

    // Define cookie expiration (5 days in milliseconds)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const expirationDate = new Date(Date.now() + expiresIn);

    // Set session cookie in the response
    return new Response("Session created", {
      status: 200,
      headers: {
        "Set-Cookie": `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expirationDate.toUTCString()}`
      }
    });

  } catch (error) {
    console.error("Error verifying token:", error);
    return new Response("Invalid session token", { status: 401 });
  }
}
