"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up with email and password, or continue with Google or GitHub.
          </p>
        </div>
        <div className="flex justify-center">
          <SignUp routing="path" path="/sign-up" />
        </div>
      </div>
    </div>
  );
}
