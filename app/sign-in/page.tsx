"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">
            Use your email and password or continue with Google or GitHub.
          </p>
        </div>
        <div className="flex justify-center">
          <SignIn routing="path" path="/sign-in" />
        </div>
      </div>
    </div>
  );
}
