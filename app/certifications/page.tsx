import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink, BookOpen } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
  credentialUrl?: string;
  description: string;
  skills: string[];
}

const certifications: Certification[] = [
  {
    name: "Cybersecurity Bootcamp",
    issuer: "AusBiz Consulting",
    date: "2025",
    status: "in-progress",
    description: "Comprehensive cybersecurity training covering network security, ethical hacking, and security operations.",
    skills: ["Network Security", "Ethical Hacking", "Security Operations", "Incident Response"],
  },
  {
    name: "AI Protector Workshop",
    issuer: "AusBiz Consulting",
    date: "2025",
    status: "in-progress",
    credentialUrl: "https://aiagents.ausbizconsulting.com.au/ai-protector-workshop",
    description: "Advanced workshop on AI security, protecting AI systems, and understanding AI-based threats.",
    skills: ["AI Security", "Threat Detection", "Machine Learning", "Security Automation"],
  },
  // Add more certifications as you complete them
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2025",
    status: "planned",
    description: "Industry-standard certification covering core security functions and cybersecurity best practices.",
    skills: ["Risk Management", "Cryptography", "Identity Management", "Security Architecture"],
  },
];

const statusColors = {
  "completed": "bg-green-500/10 text-green-500 border-green-500/20",
  "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "planned": "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const statusLabels = {
  "completed": "Completed",
  "in-progress": "In Progress",
  "planned": "Planned",
};

export default function CertificationsPage() {
  const completedCount = certifications.filter(c => c.status === "completed").length;
  const inProgressCount = certifications.filter(c => c.status === "in-progress").length;

  return (
    <div className="container max-w-4xl py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">🏆 Certifications & Training</h1>
        <p className="text-muted-foreground text-lg">
          My ongoing journey in cybersecurity education and professional development.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-500">{inProgressCount}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{certifications.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {cert.status === "completed" ? (
                      <Award className="h-6 w-6 text-primary" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{cert.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {cert.issuer}
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {cert.date}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={statusColors[cert.status]}>
                  {statusLabels[cert.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{cert.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View Credential
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Resources */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Currently Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Network security fundamentals and protocols</li>
            <li>• Web application security (OWASP Top 10)</li>
            <li>• Security Information and Event Management (SIEM)</li>
            <li>• Incident response and forensics basics</li>
            <li>• Cloud security (AWS/Azure)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
