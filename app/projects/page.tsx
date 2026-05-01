import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Brain, ShieldCheck, Users, type LucideIcon } from "lucide-react"

const projectCards: { title: string; description: string; icon: LucideIcon; bullets: string[]; tags: string[] }[] = [
  {
    title: "Digital Twin III – Live Cybersecurity Hacking Lab",
    description: "Developed a cyber-hardened digital twin portfolio simulating a real-world attack and defense environment with security monitoring and logging.",
    icon: Brain,
    bullets: [
      "Implemented secure application design with identity management, authentication, access control, and API security fundamentals",
      "Built a live hacking sandbox to simulate common attacks, including SQL injection, XSS, authentication bypass, and bot traffic detection",
      "Used modern technologies, including Next.js, Supabase, Vercel, and TypeScript to build a secure and production-ready environment",
      "Demonstrated cybersecurity lifecycle practices, including vulnerability simulation, detection, response, and continuous system improvement",
    ],
    tags: ["Next.js", "TypeScript", "Vercel", "Supabase", "SQL Injection", "XSS", "Bot Detection"],
  },
  {
    title: "Cybersecurity Analyst Internship – AusBiz Consulting (2025)",
    description: "10-week intensive program via Employability Advantage focused on cloud security, identity controls, monitoring, and threat response.",
    icon: Briefcase,
    bullets: [
      "Implemented cloud hardening strategies across AWS and Azure environments, focusing on IAM configurations, Secrets Manager, and RDS firewall rules",
      "Configured identity and API security measures, including AWS Cognito-based multi-factor authentication (MFA), mutual TLS (mTLS) with digital certificates, and API Gateway protection mechanisms",
      "Deployed real-time threat monitoring using CloudWatch, creating custom alerts and dashboards for security event detection and response",
      "Leveraged GenAI tools to accelerate vulnerability testing and threat intelligence analysis, improving detection efficiency",
      "Collaborated in Agile teams to develop and implement security best practices across multiple projects",
    ],
    tags: ["AWS", "Azure", "IAM", "CloudWatch", "mTLS", "Cognito", "GenAI", "Agile"],
  },
  {
    title: "University Security Lab Projects",
    description: "Hands-on lab exercises focused on firewall configuration, network segmentation, IDS/IPS systems, and defensive security testing.",
    icon: ShieldCheck,
    bullets: [
      "Configured and tested firewall rules, IDS/IPS systems, and network segmentation strategies in controlled environments",
      "Conducted vulnerability assessments and penetration testing exercises to identify and understand security weaknesses",
      "Analyzed malware samples and security incidents to understand attack patterns and develop appropriate defensive measures",
    ],
    tags: ["Firewalls", "IDS/IPS", "Pentesting", "Vulnerability Assessment", "Network Segmentation"],
  },
  {
    title: "Team Collaboration and Learning",
    description: "How I worked with teams and improved my professional security workflow skills.",
    icon: Users,
    bullets: [
      "Collaborated in Agile teams to develop and implement security best practices across multiple projects",
      "Completed security-focused work while strengthening communication and documentation habits",
      "Translated classroom knowledge into practical problem solving and delivery",
    ],
    tags: ["Agile", "Documentation", "Collaboration", "Problem Solving"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Projects & Experience</h1>
              <p className="max-w-[800px] text-gray-400 md:text-xl/relaxed">
                A collection of my cybersecurity projects, internship work, and university lab exercises.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {projectCards.map((project) => {
              const Icon = project.icon
              return (
                <Card key={project.title} className="border-primary/20">
                  <CardHeader>
                    <div className="mb-3 w-fit rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {project.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
