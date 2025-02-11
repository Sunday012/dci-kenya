import { cookies } from 'next/headers'
import axios from 'axios'
import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://167.235.51.199:8000/api/v1/case_officer/'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const token = formData.get('firebase_token')
    
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Valid Firebase token is required' },
        { status: 400 }
      )
    }

    const apiFormData = new FormData()
    apiFormData.append('firebase_token', token)

    const response = await axios.post(API_URL, apiFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      validateStatus: (status) => status < 500,
    })

    if (response.data?.data?.access_token) {
      const cookieStore = await cookies()

      cookieStore.set('auth_token', response.data.data.access_token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24
      })

      return NextResponse.json({
        data: response.data,
        status: 'success'
      })
    }

    return NextResponse.json({
      error: 'Invalid response from authentication server',
      status: 'error'
    }, { status: 401 })

  } catch (error) {
    console.error('Authentication error:', error)

    if (axios.isAxiosError(error)) {
      // Handle specific error cases
      if (error.response?.status === 403) {
        return NextResponse.json({
          error: 'Access forbidden. Please verify your credentials.',
          status: 'error'
        }, { status: 403 })
      }

      return NextResponse.json({
        error: error.response?.data?.detail?.[0]?.msg || 'Authentication failed',
        status: 'error'
      }, { status: error.response?.status || 500 })
    }

    return NextResponse.json({
      error: 'Internal server error',
      status: 'error'
    }, { status: 500 })
  }
}