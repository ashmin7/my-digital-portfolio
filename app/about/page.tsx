import { Award, GraduationCap, Briefcase, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">About Ashmin Aryal</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Cybersecurity student at Victoria University with practical experience in cloud hardening, identity
                security, monitoring, and security lab work.
              </p>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      {/* Profile Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ashmin Aryal</h2>
                <p className="text-xl text-muted-foreground">
                  <span className="text-primary font-semibold">Cybersecurity Student at Victoria University</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  📍 Ashfield NSW, Australia | 📧 ashminaryal111@gmail.com | 📱 0424 885 009
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  I am currently in Year 2 of my Bachelor of Cyber Security program at Victoria University (August 2024 – June 2027).
                  My focus is on advanced networking protocols, security architecture, threat analysis, system administration,
                  and defensive security strategies.
                </p>
                <p className="text-muted-foreground">
                  I completed a cybersecurity analyst internship with AusBiz Consulting (via Employability Advantage) where I
                  gained hands-on experience in cloud hardening across AWS and Azure, identity and access management, API
                  security, real-time threat monitoring with CloudWatch, and vulnerability testing using GenAI tools.
                </p>
                <p className="text-muted-foreground">
                  My foundation includes TCP/IP networking, Windows Server and Active Directory basics, Linux system administration,
                  firewall configuration, IDS/IPS awareness, vulnerability scanning, and security best practices. I'm actively
                  seeking entry-level IT support or cybersecurity internship roles where I can apply technical skills and develop
                  hands-on experience in professional environments.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-20"></div>
                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-background p-2">
                  <Image
                    src="/cyber-guardian.png"
                    alt="Ashmin Aryal - Cyber Security Specialist"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Credentials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Learning Path & Certifications</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Current study, training, and completion details that support my cybersecurity career goals.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Bachelor of Cyber Security</CardTitle>
                <CardDescription>Victoria University, Sydney</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Currently Enrolled (Year 2) | August 2024 – June 2027 (Expected)<br/><br/>
                  Focus: Advanced networking protocols, security architecture, threat analysis, system administration, and defensive security strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Statement of Completion</CardTitle>
                <CardDescription>Cybersecurity Analyst (2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Employability Advantage 10-week intensive program. Covered cloud hardening, identity security, API protection, real-time monitoring, and threat intelligence.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cybersecurity Analyst Internship</CardTitle>
                <CardDescription>AusBiz Consulting (2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  10-week engagement with cloud hardening, IAM configuration, API security, CloudWatch monitoring, and vulnerability assessment using GenAI tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Digital Twin III Project</CardTitle>
                <CardDescription>Live Cybersecurity Hacking Lab</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cyber-hardened digital twin with identity management, authentication, access control, API security, and simulated attack/defense scenarios.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>University Security Labs</CardTitle>
                <CardDescription>Hands-on defensive exercises</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Firewall configuration, IDS/IPS testing, network segmentation, vulnerability assessment, and malware analysis in controlled environments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Higher Secondary Education</CardTitle>
                <CardDescription>Computer Science, Nepal (2023)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Completed at British Grammar School, Nepal. Foundation in Mathematics, Physics, and Computer Science fundamentals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Expertise</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Specializations</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Practical skills I am building through my degree, internship, labs, and portfolio projects.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Security Tools & Fundamentals</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>SIEM awareness and log monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Firewalls, IDS/IPS, and vulnerability scanning concepts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Network traffic monitoring and analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Secure system configuration and best practices</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Basic scripting for automation and analysis</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Identity & Access Security</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Multi-factor authentication (MFA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Access control principles and authentication workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>API security basics and mutual TLS awareness</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Identity-aware cloud services and secure sign-in flows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Understanding authorization and role-based access</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Systems & Networking</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Windows Server basics and Active Directory fundamentals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Linux/Ubuntu usage and basic virtualization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>TCP/IP, DNS, and LAN/WAN concepts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>VM setup and system administration basics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Threat awareness and defensive security mindset</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Journey</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Experience So Far</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  How I&apos;m building my cyber security skills through study, industry experience, labs, and projects.
              </p>
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/40 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">Bachelor of Cyber Security</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Current
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">University Studies</p>
                <p className="text-sm text-muted-foreground">
                  Building core knowledge in networking protocols, security architecture, threat analysis, system
                  administration, and defensive security strategies.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">Cybersecurity Analyst Intern – AusBiz Consulting</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    2025
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">Industry Experience</p>
                <p className="text-sm text-muted-foreground">
                    Completed a 10-week intensive cybersecurity analyst internship with exposure to cloud hardening,
                    identity security, API protection, monitoring, and threat intelligence analysis.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">Labs, Assignments & Security Tools</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Ongoing
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">Practical Exercises</p>
                <p className="text-sm text-muted-foreground">
                  Gaining experience with SIEM tools, firewalls, IDS/IPS, and basic scripting and network analysis to
                  understand how attacks and anomalies appear in real data and logs.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">Self-Study & Personal Projects</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Ongoing
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">Portfolio & AI Security</p>
                <p className="text-sm text-muted-foreground">
                  Using this digital portfolio, the Digital Twin III project, and security-focused learning to practice
                  secure web development, identity protection, monitoring, and applied cybersecurity concepts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
