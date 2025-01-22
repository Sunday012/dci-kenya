"use client"

import { useState, useEffect } from "react"
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store the token in localStorage
        user.getIdToken().then((token) => {
          localStorage.setItem("userToken", token)
          console.log("User Token:", token)
          console.log("User Info:", {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        })
        setUser(user)
      } else {
        localStorage.removeItem("userToken")
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  return {
    user,
    loading,
    signInWithGoogle,
  }
}

