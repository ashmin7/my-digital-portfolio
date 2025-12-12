import type { Config } from "drizzle-kit"
import "dotenv/config"

console.log("Loading database configuration...")

// Prefer using the full connection string directly. This supports Neon and other providers
// with query parameters like sslmode and channel_binding without custom parsing.
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.")
  throw new Error("No database credentials found. Please add DATABASE_URL to your .env file.")
}

// Configuration for drizzle-kit
export default {
  schema: "./lib/db.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // drizzle-kit supports connectionString for Postgres
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
} satisfies Config
