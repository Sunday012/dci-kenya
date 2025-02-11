import { cookies } from 'next/headers'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const token = formData.get('firebase_token') as string
    console.log(token)
    if (!token) {
      return Response.json({ error: 'Token is required' }, { status: 400 })
    }

    console.log("Received token:", token)
    
    // Create form data for the external API
    const apiFormData = new FormData()
    apiFormData.append('firebase_token', token)

    // Call external API
    const { data } = await axios.post(
      'http://167.235.51.199:8000/api/v1/case_officer/',
      apiFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    // Set cookie if we get an access token
    if (data.data.access_token) {
      const cookieStore = await cookies()
      cookieStore.set('auth_token', data.data.access_token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
      })
    }

    return Response.json(data)
  } catch (error) {
    console.error('API Route Error:', error)
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500
      const message = error.response?.data?.detail?.[0]?.msg || error.message
      return Response.json({ error: message }, { status })
    }
    
    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}