import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      )
    }

    console.log('📬 [Accemberg Lead Received]:', {
      name: body.name,
      email: body.email,
      company: body.company || 'N/A',
      preferredDate: body.preferredDate || 'N/A',
      message: body.message || 'N/A',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Your request has been received. Our team will get back to you shortly.',
      bookingId: 'lead_' + Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unable to process request.' },
      { status: 500 }
    )
  }
}
