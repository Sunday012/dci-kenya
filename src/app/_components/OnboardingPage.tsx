"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Icons } from "./Icons";
import { useRouter } from 'next/navigation';
import { toast } from "@/hooks/use-toast";
import { userStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie"

interface ApiError {
  detail: Array<{
    loc: [string, number]
    msg: string
    type: string
  }>
}

type ApiResponse = any

const sendTokenToApi = async (token: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("firebase_token", token);

    const { data } = await axios.post<ApiResponse>('http://167.235.51.199:8000/api/v1/case_officer/', 
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log(data);
    if (data.data.access_token) {
      console.log("access_token", data.data.access_token);
      Cookies.set('auth_token', data.data.access_token);
      toast({
        title: "Success",
        description: "Authentication successful",
        variant: "default",
      });
    }
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to authenticate",
      variant: "destructive",
    });
    throw error;
  }
}

export default function OnboardingPage() {
  const { signInWithGoogle, error } = useAuthStore()
  const route = useRouter()
  const {setUser, setToken} = userStore()

  const { mutate, isPending } = useMutation<
    ApiResponse,
    AxiosError<ApiError>,
    string
  >({
    mutationFn: sendTokenToApi,
    onSuccess: (data, token) => {
      console.log("firbase_token", token)
      // Cookies.set('auth_token', token, { secure: true })
      toast({
        title: "Sign In Successful",
        description: "Your account has been verified.",
        variant: "default",
      })
      console.log("user_token", data.data.access_token)
      setToken(data.data.access_token)
      setUser(data.data.user)
      if (data.data.user.kyc_verification == false) {
        route.push("/snapshot")
      } else {
        route.push("/")
      }
    },
    onError: (error) => {
      console.error('API Error:', error)
      
      const errorMessage = error.response?.data?.detail?.[0]?.msg ?? 
        'Failed to verify your account. Please try again.'
      
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  })

  const handleGoogleSignIn = async () => {
    try {
      const newUser = await signInWithGoogle()
      if (newUser) {
        const token = await newUser.getIdToken()
        
        mutate(token)

        toast({
          title: "Google Sign In Successful",
          description: `Welcome, ${newUser.displayName || newUser.email}!`,
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error during sign in:", error)
      toast({
        title: "Sign In Failed",
        description: "An error occurred during sign in. Please try again.",
        variant: "destructive",
      })
    }
  }

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     router.push("/snapshot");
  //   } catch (error) {
  //     console.error("Failed to sign in:", error);
  //   }
  // }

  if (isPending) {
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
