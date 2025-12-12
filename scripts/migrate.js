// Simple JS migration runner for Neon using the same schema as migrate.ts
// Loads .env, creates tables if they don't exist, and seeds sample data.

require('dotenv').config()
const { neon } = require('@neondatabase/serverless')

async function main() {
  console.log('Starting database migration (JS)...')

  let connectionString
  if (process.env.DATABASE_URL) {
    connectionString = process.env.DATABASE_URL
  } else if (
    process.env.PGHOST &&
    process.env.PGUSER &&
    process.env.PGDATABASE &&
    process.env.PGPASSWORD
  ) {
    connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`
  } else {
    throw new Error('No database credentials found. Set DATABASE_URL in .env')
  }

  const sql = neon(connectionString)

  try {
    await sql`CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      role TEXT DEFAULT 'user'
    )`
    console.log('✅ subscribers ensured')

    await sql`CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      cover_image TEXT,
      author TEXT NOT NULL,
      read_time TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )`
    console.log('✅ blog_posts ensured')

    await sql`CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      is_read TEXT DEFAULT 'false'
    )`
    console.log('✅ contact_submissions ensured')

    const [{ count: subsCount }] = await sql`SELECT COUNT(*)::int AS count FROM subscribers`
    if (subsCount === 0) {
      await sql`INSERT INTO subscribers (email, name) VALUES
        (${"john.doe@example.com"}, ${"John Doe"}),
        (${"jane.smith@example.com"}, ${"Jane Smith"}),
        (${"robert.johnson@example.com"}, ${"Robert Johnson"})`
      console.log('✅ sample subscribers inserted')
    } else {
      console.log('ℹ️ subscribers already have data')
    }

    const [{ count: postCount }] = await sql`SELECT COUNT(*)::int AS count FROM blog_posts`
    if (postCount === 0) {
      const rows = [
        {
          title: 'Understanding Zero-Day Vulnerabilities',
          slug: 'understanding-zero-day-vulnerabilities',
          excerpt: "What they are, how they're exploited, and how to protect your systems.",
          content: '<p>Zero-day vulnerabilities represent one of the most significant threats in cybersecurity today...</p>',
          cover_image: '/unseen-threat.png',
          author: 'John Doe',
          read_time: '8 min read',
        },
        {
          title: 'Ransomware Protection Strategies',
          slug: 'ransomware-protection-strategies',
          excerpt: 'Effective strategies to prevent, detect, and recover from ransomware attacks.',
          content: '<p>Ransomware attacks continue to pose a significant threat...</p>',
          cover_image: '/digital-shield.png',
          author: 'Jane Smith',
          read_time: '10 min read',
        },
        {
          title: 'Securing Cloud Infrastructure',
          slug: 'securing-cloud-infrastructure',
          excerpt: 'Best practices for securing your cloud infrastructure and applications.',
          content: '<p>As organizations continue to migrate to the cloud...</p>',
          cover_image: '/secure-cloud-network.png',
          author: 'Michael Chen',
          read_time: '12 min read',
        },
      ]

      // Insert rows one-by-one with parameterized values to avoid SQL concat issues
      for (const r of rows) {
        await sql`INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, read_time)
          VALUES (${r.title}, ${r.slug}, ${r.excerpt}, ${r.content}, ${r.cover_image}, ${r.author}, ${r.read_time})`
      }

      console.log('✅ sample blog posts inserted')
    } else {
      console.log('ℹ️ blog_posts already have data')
    }

    console.log('✅ Migration completed successfully')
  } catch (err) {
    console.error('❌ Migration failed:', err)
    process.exitCode = 1
  }
}

main()
