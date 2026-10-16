import { auth } from "../../../../Firebase/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { adminClientPromise } from "../../../../mongodb/mongodb";
import { z } from "zod";

// Define schemas for input validation
const emailSchema = z
  .string()
  .email()
  .transform((email) => email.replace(/[^a-zA-Z0-9]/g, "_"));
const passwordSchema = z
  .string()
  .min(6, { message: "Password must contain at least 6 characters" })
  .regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$/, {
    message: "Password must contain only letters, numbers, and allowed symbols",
  });
const nameSchema = z.string().nonempty();
const instituteSchema = z.string().nonempty();
const provinceSchema = z.string().nonempty();
const districtSchema = z.string().nonempty();

function validateInput(
  email,
  password,
  name,
  province,
  district,
  institute
) {
  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);
    nameSchema.parse(name);
    instituteSchema.parse(institute);
    provinceSchema.parse(province);
    districtSchema.parse(district);
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errorMessages = e.errors.map((error) => error.message);
      throw new Error(errorMessages.join(", "));
    } else {
      throw e;
    }
  }
}

export async function POST(req) {
  const {
    email,
    password,
    confirmPassword,
    name,
    province,
    district,
    institute,
  } = await req.json();

  if (password !== confirmPassword) {
    return new Response("Passwords do not match", { status: 409 });
  }

  try {
    validateInput(
      email,
      password,
      name,
      province,
      district,
      institute
    );
    // Create a new user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Send email verification
    await sendEmailVerification(user);
    // Prepare user data for MongoDB
    const userData = {
      _id: email,
      uid: user.uid,
      email: user.email,
      name,
      province,
      district,
      institute,
      createdAt: new Date(),
    };

    // insert Data to Database
    const client = await adminClientPromise;
    const db = client.db("mel-nld");
    await db.collection("users").insertOne(userData);
    return new Response("Registration successful", { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === "auth/email-already-in-use") {
      return new Response("Email address already registered !", {
        status: 409,
      });
    }
    return new Response("An error occurred during registration.", {
      status: 500,
    });
  }
}
