"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { logEvent } from "@/lib/logger";
import { useEffect, useState } from "react";

export default function SecurityJournal() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [hasLogged, setHasLogged] = useState(false);

  // Log access attempts only once after auth is loaded
  useEffect(() => {
    if (!isLoaded || hasLogged) return;
    
    if (isSignedIn) {
      logEvent(`User ${userId ?? "unknown"} accessed security journal`, "info", { userId });
    } else {
      logEvent("Unauthenticated visitor attempted to access security journal", "warn");
    }
    setHasLogged(true);
  }, [isLoaded, isSignedIn, userId, hasLogged]);

  // Show loading while auth is being checked
  if (!isLoaded) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>🔐 Security Journal</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // If not signed in, show an access message instead of the journal
  if (!isSignedIn) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>🔐 Security Journal</h1>
        <p style={{ marginTop: "1rem" }}>Access denied. Please sign in to view this page.</p>
        <p style={{ marginTop: "0.5rem" }}>
          <Link
            href="/sign-in"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Go to Sign In
          </Link>
        </p>
      </div>
    );
  }

  // Signed-in user sees the full journal
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔐 Security Journal – Week 1–3</h1>

      {/* Mini Project 1 */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Mini Project 1: Environment Variables</h2>
        <p>
          🔗 LMS Link:{" "}
          <a
            href="https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp"
            target="_blank"
            rel="noreferrer"
          >
            Cybersecurity Bootcamp
          </a>
        </p>
        <p>📘 Learned:</p>
        <ul>
          <li>Secured sensitive information using environment variables</li>
          <li>Prevented credential leakage in GitHub</li>
          <li>Configured Vercel environment variables for production</li>
        </ul>
      </section>

      <hr style={{ margin: "2rem 0" }} />

      {/* Mini Project 2 */}
      <section>
        <h2>Mini Project 2: Authentication</h2>
        <p>
          🔗 LMS Link:{" "}
          <a
            href="https://aiagents.ausbizconsulting.com.au/ai-protector-workshop"
            target="_blank"
            rel="noreferrer"
          >
            AI Protector Workshop
          </a>
        </p>
        <p>📘 Learned:</p>
        <ul>
          <li>Implemented Clerk authentication to secure protected pages</li>
          <li>Used middleware to enforce route protection in Next.js</li>
          <li>Applied session management and logged user activity</li>
        </ul>
      </section>

      <hr style={{ margin: "2rem 0" }} />

      {/* Mini Project 3 */}
      <section>
        <h2>Mini Project 3: Database Migration</h2>
        <p>
          🔗 LMS Link:{" "}
          <a
            href="https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp"
            target="_blank"
            rel="noreferrer"
          >
            Cybersecurity Bootcamp
          </a>
        </p>
        <p>📘 Learned:</p>
        <ul>
          <li>Used Drizzle ORM for schema management</li>
          <li>Generated and applied migrations safely</li>
          <li>Verified migration status and ensured schema integrity</li>
        </ul>
      </section>
    </div>
  );
}
