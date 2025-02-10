import { sendTokenToApi } from "../mutation/sendToken"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const token = formData.get('firebase_token') as string
    console.log(token)
    const result = await sendTokenToApi(token)
    return Response.json(result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    const status = error && typeof error === 'object' && 'status' in error ? Number(error.status) : 500
    return Response.json({ error: errorMessage }, { status })
  }
}