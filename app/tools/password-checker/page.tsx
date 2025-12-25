"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Shield, ShieldAlert, ShieldCheck, ShieldX, Check, X } from "lucide-react";

interface StrengthCheck {
  label: string;
  passed: boolean;
}

function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  checks: StrengthCheck[];
} {
  const checks: StrengthCheck[] = [
    { label: "At least 8 characters", passed: password.length >= 8 },
    { label: "At least 12 characters (recommended)", passed: password.length >= 12 },
    { label: "Contains lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Contains uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Contains number", passed: /[0-9]/.test(password) },
    { label: "Contains special character (!@#$%^&*)", passed: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
    { label: "No common patterns (123, abc, qwerty)", passed: !/(?:123|abc|qwerty|password|admin)/i.test(password) },
    { label: "At least 16 characters (excellent)", passed: password.length >= 16 },
  ];

  const passedChecks = checks.filter(c => c.passed).length;
  
  // Calculate score out of 100
  let score = 0;
  
  if (password.length === 0) {
    score = 0;
  } else if (password.length < 8) {
    score = Math.min(20, password.length * 2);
  } else {
    score = 20 + (passedChecks - 1) * 10;
  }
  
  score = Math.min(100, Math.max(0, score));

  let label: string;
  let color: string;
  
  if (score === 0) {
    label = "Enter a password";
    color = "bg-gray-300";
  } else if (score < 30) {
    label = "Very Weak";
    color = "bg-red-500";
  } else if (score < 50) {
    label = "Weak";
    color = "bg-orange-500";
  } else if (score < 70) {
    label = "Fair";
    color = "bg-yellow-500";
  } else if (score < 90) {
    label = "Strong";
    color = "bg-green-500";
  } else {
    label = "Very Strong";
    color = "bg-emerald-500";
  }

  return { score, label, color, checks };
}

function getTimeToCrack(password: string): string {
  if (password.length === 0) return "-";
  
  // Simplified calculation based on character set and length
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
  
  const combinations = Math.pow(charsetSize, password.length);
  const attemptsPerSecond = 10_000_000_000; // 10 billion (modern GPU)
  const seconds = combinations / attemptsPerSecond / 2; // Average case
  
  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} thousand years`;
  return "Millions of years+";
}

export default function PasswordCheckerPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => calculatePasswordStrength(password), [password]);
  const timeToCrack = useMemo(() => getTimeToCrack(password), [password]);

  const StrengthIcon = strength.score < 30 ? ShieldX : 
                       strength.score < 50 ? ShieldAlert : 
                       strength.score < 70 ? Shield : ShieldCheck;

  return (
    <div className="container max-w-2xl py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">🔐 Password Strength Checker</h1>
        <p className="text-muted-foreground text-lg">
          Test how secure your password is. Your password never leaves your browser.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StrengthIcon className={`h-5 w-5 ${
              strength.score >= 70 ? "text-green-500" : 
              strength.score >= 50 ? "text-yellow-500" : 
              strength.score > 0 ? "text-red-500" : "text-gray-400"
            }`} />
            Password Analysis
          </CardTitle>
          <CardDescription>
            Enter a password to check its strength
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="pr-10 text-lg h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Strength Meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Strength</span>
              <Badge variant={strength.score >= 70 ? "default" : "secondary"}>
                {strength.label}
              </Badge>
            </div>
            <Progress value={strength.score} className={`h-3 ${strength.color}`} />
          </div>

          {/* Time to Crack */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated time to crack:</p>
            <p className={`text-2xl font-bold ${
              timeToCrack.includes("year") ? "text-green-500" : 
              timeToCrack.includes("day") ? "text-yellow-500" : "text-red-500"
            }`}>
              {timeToCrack}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on 10 billion attempts/second (modern GPU)
            </p>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Security Checklist:</p>
            <div className="grid gap-2">
              {strength.checks.map((check, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 text-sm ${
                    check.passed ? "text-green-600" : "text-muted-foreground"
                  }`}
                >
                  {check.passed ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-300" />
                  )}
                  {check.label}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">💡 Tips for Strong Passwords:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use a passphrase: "correct-horse-battery-staple"</li>
              <li>• Never reuse passwords across sites</li>
              <li>• Use a password manager like Bitwarden or 1Password</li>
              <li>• Enable two-factor authentication when possible</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-6">
        🔒 Your password is analyzed locally and never sent to any server.
      </p>
    </div>
  );
}
