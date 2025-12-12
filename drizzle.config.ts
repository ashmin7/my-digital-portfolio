import type { Config } from "drizzle-kit"
import "dotenv/config"

// Prefer using the full connection string directly. This supports Neon and other providers
// with query parameters like sslmode and channel_binding without custom parsing.
if (!process.env.DATABASE_URL) {
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
