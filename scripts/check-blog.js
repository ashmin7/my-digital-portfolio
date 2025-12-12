const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function checkBlogPosts() {
  try {
    const result = await sql`SELECT id, title, slug, author FROM blog_posts ORDER BY created_at DESC`;
    console.log('Blog posts in database:', result.length);
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkBlogPosts();
