"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Icons } from "./Icons";
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { signInWithGoogle, loading } = useAuth()
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/onboarding");
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F4F4]">
      <div className="w-full max-w-md text-center space-y-8 p-8 bg-white rounded-lg">
        <div className="mx-auto size-24 bg-[#1B3A4B] rounded-full flex items-center justify-center">
          <span className="text-white text-[55px] font-bold">D</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#1F3D4F]">Welcome to DCI!</h1>
          <p className="text-[#81889B] text-sm max-w-sm mx-auto">
            Simplified criminal case system digitizing investigations and evidence management
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full flex items-center rounded-[20px] justify-center bg-[#F1F2F3] border border-[#E2E2E2] font-bold text-[#1F3D4F] gap-2 py-6"
        >
          <Icons.google />
          Continue with Google
        </Button>
      </div>
    </main>
  )
}
