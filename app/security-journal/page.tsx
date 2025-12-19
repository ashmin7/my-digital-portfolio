'use client';

import { useAuth } from "@clerk/nextjs";
import { logEvent } from "../../lib/logger";

export default function SecurityJournal() {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) return <p>Access Denied</p>;

  logEvent(`User ${userId} accessed security journal`);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔐 Security Journal – Week 1–3</h1>

      {/* Mini Project 1 */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Mini Project 1: Environment Variables</h2>
        <p>
          🔗 LMS Link: <a href="https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp" target="_blank" rel="noreferrer">Cybersecurity Bootcamp</a>
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
          🔗 LMS Link: <a href="https://aiagents.ausbizconsulting.com.au/ai-protector-workshop" target="_blank" rel="noreferrer">AI Protector Workshop</a>
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
          🔗 LMS Link: <a href="https://www.ausbizconsulting.com.au/courses/cybersec-bootcamp" target="_blank" rel="noreferrer">Cybersecurity Bootcamp</a>
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
