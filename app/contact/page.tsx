import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Phone, MapPin, Linkedin, Globe, FolderKanban } from "lucide-react"

const contactLinks = [
  { label: "Email", value: "ashminaryal111@gmail.com", href: "mailto:ashminaryal111@gmail.com", icon: Mail },
  { label: "Phone", value: "0424 885 009", href: "tel:+61424885009", icon: Phone },
  { label: "LinkedIn", value: "linkedin.com/in/ashmin-aryal-b42bab2a9", href: "https://www.linkedin.com/in/ashmin-aryal-b42bab2a9", icon: Linkedin },
  { label: "Portfolio", value: "ashminaryal.info", href: "https://ashminaryal.info", icon: Globe },
  { label: "Project", value: "digital-twin-digitalmind222.vercel.app", href: "https://digital-twin-digitalmind222.vercel.app", icon: FolderKanban },
]

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          I&apos;m open to IT support and cybersecurity internship opportunities, collaboration, and professional connections.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Details
            </CardTitle>
            <CardDescription>
              The fastest way to reach me for opportunities or portfolio feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactLinks.map((item) => {
              const Icon = item.icon
              return (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-center justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Open</Button>
                </a>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile & Interests</CardTitle>
            <CardDescription>
              Ashfield NSW, Australia • Victoria University (Year 2) • Cybersecurity Analyst Intern
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {["Security Tools", "Identity & Access", "Cloud Security", "Monitoring", "IT Support", "SOC Fundamentals"].map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" />Ashfield NSW, Australia</p>
              <p><strong>Languages:</strong> English (Fluent), Nepali (Native), Hindi (Fluent)</p>
              <p><strong>Interests:</strong> Cybersecurity labs (TryHackMe, home labs), CTF challenges, Linux virtualisation, staying updated on threats</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
              <p>
                I'm seeking entry-level IT support or cybersecurity internship roles. I'm especially interested in positions where I can
                support users, monitor security events, improve access controls, and continue learning from experienced professionals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
