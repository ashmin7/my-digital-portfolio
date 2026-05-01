import Link from "next/link"
import Image from "next/image"
import { Shield, Lock, Server, Database, AlertTriangle, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { db, blogPosts } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function Home() {
  // Fetch the latest 3 blog posts with error handling
  let latestPosts: { id: string; slug: string; title: string; excerpt: string; coverImage?: string; createdAt: string }[] = []
  let dbError = false

  try {
    latestPosts = (await db.select().from(blogPosts).orderBy(blogPosts.createdAt).limit(3)).map(post => ({
      id: post.id.toString(),
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage || undefined,
      createdAt: post.createdAt ? post.createdAt.toISOString() : ""
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    dbError = true
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - redesigned */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-black via-slate-950 to-background">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:64px_64px] opacity-5" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />

        <div className="container relative z-10 px-4 py-12 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary shadow-sm">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                Cybersecurity Research Portfolio
              </div>
              <div className="space-y-3">
                <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-sky-400 to-indigo-400">
                  Ashmin Aryal
                </h1>
                <p className="max-w-xl text-balance text-muted-foreground md:text-lg">
                  Cybersecurity student at Victoria University with practical experience in cloud hardening,
                  identity and access management, threat monitoring, and security lab work.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/projects">
                  <Button size="lg" className="shadow-lg shadow-primary/30">
                    View Projects
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="border-primary/40 text-primary">
                    View Profile
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Focus: cybersecurity operations, IT support, and SOC fundamentals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span>Stack: Next.js, TypeScript, Vercel, Supabase</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-sky-500/10 to-indigo-500/20 blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-xl">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Snapshot
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Available for internships
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-primary">
                        <Lock className="h-3.5 w-3.5" />
                        Cloud & Identity
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        IAM, MFA, mTLS, API protection, and cloud hardening.
                      </p>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-primary">
                        <Database className="h-3.5 w-3.5" />
                        Monitoring
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        CloudWatch alerts, dashboards, and threat visibility.
                      </p>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-primary">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Threats
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Threat detection, vulnerability testing, and response fundamentals.
                      </p>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-primary">
                        <FileCode className="h-3.5 w-3.5" />
                        Portfolio
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Showcasing projects, labs, certifications, and internship experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Database Error Alert */}
      {dbError && (
        <div className="container px-4 md:px-6 py-6">
          <Alert variant="destructive">
            <AlertTitle>Database Error</AlertTitle>
            <AlertDescription>
              There was an error connecting to the database. Please try refreshing the page or contact support if the
              issue persists.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Skills</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Practice Projects & Learning Areas</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A snapshot of the areas I&apos;m building through university assignments, labs, internship work, and
                self-practice as I grow toward an entry-level cybersecurity role.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Security Tools & Fundamentals</CardTitle>
                <CardDescription>
                  SIEM, firewalls, IDS/IPS, vulnerability assessment, and network traffic monitoring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Understanding how common attacks are carried out</li>
                  <li>Basic scripting for automation, analysis, and reporting</li>
                  <li>Network traffic inspection and packet analysis</li>
                  <li>Hands-on lab work based on real-world scenarios</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Identity & Access Security</CardTitle>
                <CardDescription>
                  MFA, IAM, access control, API security basics, and authentication workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Working with SIEM tools for log collection and alerting</li>
                  <li>Configuring and testing firewalls and access rules</li>
                  <li>Experimenting with IDS/IPS in lab environments</li>
                  <li>Connecting theory from class to practical tool use</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <FileCode className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Projects & Continuous Learning</CardTitle>
                <CardDescription>
                  Using this digital portfolio to turn what I learn into a clear, professional, and shareable record of progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Building a secure Next.js app with practical security sections</li>
                  <li>Documenting the Digital Twin III project and lab exercises</li>
                  <li>Tracking my growth as an aspiring cybersecurity analyst</li>
                  <li>Preparing for internships and entry-level roles</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Journey</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Early in My Cyber Security Journey
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  I&apos;m in the early stages of my career, but I&apos;m strongly motivated by threat analysis, defensive
                  security, and the practical work of protecting systems. Each new lab, assignment, and project
                  strengthens my goal of becoming a cybersecurity analyst.
                </p>
              </div>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span>Second-year Bachelor of Cyber Security student building core defensive security skills.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span>Hands-on labs using SIEM tools, firewalls, IDS/IPS, and security monitoring workflows.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span>Self-practice with scripting and network analysis to identify attacks in logs and traffic.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span>Focused on threat detection, incident response, and defensive security fundamentals.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span>Actively seeking an internship or entry-level role to contribute and continue learning.</span>
                </li>
              </ul>
              <div>
                <Link href="/about">
                  <Button variant="outline">Learn More About My Experience</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg bg-primary/10 p-2 lg:p-4">
                    <Image
                      src="/digital-watchtower.png"
                      width={300}
                      height={300}
                      alt="Security monitoring"
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg bg-primary/10 p-2 lg:p-4">
                    <Image
                      src="/digital-fortress.png"
                      width={300}
                      height={300}
                      alt="Network security"
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg bg-primary/10 p-2 lg:p-4">
                    <Image
                      src="/cyber-guardian.png"
                      width={300}
                      height={300}
                      alt="Cybersecurity professional"
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg bg-primary/10 p-2 lg:p-4">
                    <Image
                      src="/modern-soc-overview.png"
                      width={300}
                      height={300}
                      alt="Security operations center"
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg bg-primary/10 p-2 lg:p-4">
                    <Image
                      src="/digital-security-breach.png"
                      width={300}
                      height={300}
                      alt="Penetration testing"
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg bg-primary/10 p-2 lg:p-4">
                    <Image
                      src="/interconnected-threat-analysis.png"
                      width={300}
                      height={300}
                      alt="Cyber threat intelligence"
                      className="aspect-square rounded-md object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Connect</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Stay Updated on My Journey
              </h2>
              <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                Stay in touch for project updates, internship progress, and cybersecurity learning notes.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      {/* Recent Blog Posts */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Blog</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Insights</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A place for short write-ups on cybersecurity, project work, and practical lessons from labs and internships.
              </p>
            </div>
          </div>

          {dbError ? (
            <div className="mx-auto max-w-5xl py-12 text-center">
              <p className="text-muted-foreground">Unable to load blog posts at this time. Please try again later.</p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="overflow-hidden bg-background border-primary/20 transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg?height=400&width=600&query=cybersecurity"}
                        width={600}
                        height={400}
                        alt={post.title}
                        className="object-cover transition-all duration-200 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Link href="/blog">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social / Connect Section */}
      <section className="w-full border-t bg-muted/40 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Connect with me</h2>
              <p className="max-w-[600px] text-muted-foreground text-sm md:text-base mx-auto">
                If you&apos;d like to talk about internships, projects, or cyber security in general, feel free to
                connect with me on social media.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Link
                href="https://www.linkedin.com/in/ashmin-aryal-b42bab2a9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary/5 hover:border-primary/70 transition-colors"
              >
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://www.facebook.com/ashmin.aryal11/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <span>Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
