import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Calendar, CheckCircle2 } from "lucide-react"

export default function CertificationsPage() {
  return (
    <div className="container max-w-5xl py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Certifications & Training</h1>
        <p className="text-muted-foreground text-lg">
          Formal completion, ongoing study, and practical training that support my cybersecurity career path.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Statement of Completion - Cybersecurity Analyst</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  Employability Advantage
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    2025
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Completed a 10-week industry engagement led cybersecurity analyst internship with exposure to cloud
                hardening, identity security, API protection, monitoring, and threat intelligence.
              </p>
            <div className="flex flex-wrap gap-2">
              {["Cloud Hardening", "IAM", "MFA", "API Security", "Threat Monitoring", "Threat Intelligence"].map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Supported by industry experts from AusBiz Consulting Pty Ltd.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Current Learning Focus</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  University study and self-practice
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Network security fundamentals and protocols</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Web application security and secure development</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Security Information and Event Management (SIEM)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Incident response and forensics basics</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Cloud security with AWS and Azure</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
