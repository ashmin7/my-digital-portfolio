import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    // Token bucket rate limit tracked by userId
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      characteristics: ["userId"], // track requests by a custom user ID
      refillRate: 5, // refill 5 tokens per interval
      interval: 10, // refill every 10 seconds
      capacity: 10, // bucket maximum capacity of 10 tokens
    }),
  ],
});

export async function GET(req: Request) {
  const { userId } = await auth();
  const effectiveUserId = userId ?? "anonymous"; // Replace with your authenticated user ID when available
  const decision = await aj.protect(req, { userId: effectiveUserId, requested: 5 }); // Deduct 5 tokens from the bucket

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  // If allowed, return a success payload

  return NextResponse.json({ message: "Hello world" });
}