import { db, blogPosts } from "./db";

// Sample blog posts with real article content in HTML
const samplePosts = [
  {
    title: "Security Best Practices in AI and Model Context Protocol",
    slug: "security-best-practices-ai-mcp",
    excerpt:
      "Learn how to keep AI agents and MCP servers safe by focusing on least privilege, secure APIs, and strong monitoring.",
    content: `
      <p>
        As AI assistants and agent frameworks become more powerful, attackers are increasingly looking for ways to
        abuse them. The Model Context Protocol (MCP) makes it easy to connect tools and data sources to AI models—but
        that also means you must think like a security engineer when you expose those tools.
      </p>
      <h2>1. Treat Your AI Agent Like a Web App</h2>
      <p>
        Every tool you plug into your AI agent is similar to exposing an API endpoint on the internet. Before adding a
        new MCP tool, ask yourself:
      </p>
      <ul>
        <li>What data can this tool read or modify?</li>
        <li>What is the worst thing that could happen if it is abused?</li>
        <li>Does it need authentication, rate limiting, or audit logs?</li>
      </ul>
      <p>
        If you would not expose an action directly to the public internet, you probably should not give it directly to
        an AI agent without strong guardrails.
      </p>
      <h2>2. Use Least Privilege for Tools</h2>
      <p>
        Do not give your AI agent full admin power over your infrastructure. Instead:
      </p>
      <ul>
        <li>Create read-only database roles for most tasks.</li>
        <li>Restrict filesystem access to a safe working directory.</li>
        <li>Limit external HTTP calls to a small set of trusted domains.</li>
      </ul>
      <p>
        The goal is simple: if the model is tricked into doing something unexpected, the blast radius should be small.
      </p>
      <h2>3. Log Everything the Agent Does</h2>
      <p>
        Good logging turns AI behaviour from a black box into something you can monitor and improve. For each tool
        call, log:
      </p>
      <ul>
        <li>Which user triggered it.</li>
        <li>What tool was used and with which arguments.</li>
        <li>Whether it succeeded or failed.</li>
      </ul>
      <p>
        These logs are extremely useful for both security investigations and improving the quality of your agent.
      </p>
      <h2>4. Keep Your Stack Patched</h2>
      <p>
        AI security is not only about the model. It is also about the framework, database, hosting platform, and any
        third‑party SDKs you use. Keep an eye on security advisories (like the Next.js CVEs) and patch quickly—your AI
        assistant is only as secure as the stack around it.
      </p>
      <p>
        In this portfolio project, I practice these habits by securing my Next.js app, Neon database, and MCP tools the
        same way I would secure a production system—but at a student level, where I am still learning and improving.
      </p>
    `,
    coverImage: "/blog/ai-mcp-security.jpg",
    author: "Ashmin Aryal",
    readTime: "7 min read",
  },
  {
    title: "Starting a Cyber Security Home Lab as a Student",
    slug: "starting-cybersecurity-home-lab",
    excerpt:
      "A simple, realistic home lab setup you can use to practice blue-team skills, log analysis, and basic attack simulations.",
    content: `
      <p>
        You do not need a huge budget to start learning cyber security. A small home lab gives you a safe environment to
        break things, fix them again, and understand how attacks really work.
      </p>
      <h2>1. Keep It Simple at First</h2>
      <p>
        As a student, focus on a basic but realistic setup:
      </p>
      <ul>
        <li>One Linux virtual machine acting as a server or target.</li>
        <li>One Windows or Linux machine acting as an attacker or analyst.</li>
        <li>A SIEM or logging tool (even simple log files and Wireshark are enough at the beginning).</li>
      </ul>
      <p>
        This is more than enough to practice network scanning, basic hardening, and log analysis.
      </p>
      <h2>2. Practice Both Offense and Defense</h2>
      <p>
        I use my lab to experiment with both sides:
      </p>
      <ul>
        <li>Running simple scans and seeing how they look in logs.</li>
        <li>Hardening SSH, firewall rules, and users.</li>
        <li>Capturing traffic with tools like Wireshark to understand what is normal and what is suspicious.</li>
      </ul>
      <p>
        The goal is not to become a professional penetration tester overnight, but to build strong intuition about how
        systems behave under normal and abnormal conditions.
      </p>
      <h2>3. Document What You Learn</h2>
      <p>
        Every time you complete a small experiment—like locking down SSH or detecting a scan—write it down. That is the
        kind of practical story you can share in internship interviews and also here on this portfolio.
      </p>
    `,
    coverImage: "/blog/home-lab.jpg",
    author: "Ashmin Aryal",
    readTime: "6 min read",
  },
  {
    title: "How I Built This Cyber Security Portfolio",
    slug: "building-my-cybersecurity-portfolio",
    excerpt:
      "A behind‑the‑scenes look at how I use Next.js, Neon, Drizzle, and security best practices to present my journey as a cyber security student.",
    content: `
      <p>
        This site is more than just a personal website—it is a learning project where I practice secure web development
        while telling my story as a second‑year Bachelor of Cyber Security student.
      </p>
      <h2>1. Tech Stack</h2>
      <p>
        I built this portfolio using:
      </p>
      <ul>
        <li>Next.js App Router for the frontend and routing.</li>
        <li>Neon Postgres as the database.</li>
        <li>Drizzle ORM for type‑safe queries and migrations.</li>
        <li>Clerk for authentication with email and social logins.</li>
      </ul>
      <p>
        Working with this stack helps me understand how modern web applications are structured in real companies.
      </p>
      <h2>2. Security Mindset</h2>
      <p>
        Even though this is a student project, I still think carefully about security:
      </p>
      <ul>
        <li>Environment variables for secrets instead of hard‑coding keys.</li>
        <li>Database migrations instead of ad‑hoc schema changes.</li>
        <li>Input validation for forms like the newsletter subscription.</li>
      </ul>
      <p>
        These small habits add up and prepare me for working on real production systems.
      </p>
      <h2>3. Continuous Improvement</h2>
      <p>
        I plan to keep adding new blog posts as I learn new tools—like SIEMs, firewalls, IDS/IPS, and AI security
        concepts—so this portfolio grows with my skills over time.
      </p>
    `,
    coverImage: "/blog/portfolio-build.jpg",
    author: "Ashmin Aryal",
    readTime: "5 min read",
  },
];

export async function seedSampleBlogPosts() {
  try {
    for (const post of samplePosts) {
      await db
        .insert(blogPosts)
        .values(post)
        .onConflictDoUpdate({
          target: blogPosts.slug,
          set: {
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            author: post.author,
            readTime: post.readTime,
            updatedAt: new Date(),
          },
        });
    }
  } catch (error) {
    console.error("Error seeding sample blog posts:", error);
  }
}
