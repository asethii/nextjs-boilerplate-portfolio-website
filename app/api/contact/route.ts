import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('=== CONTACT API CALLED ===');
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('API Key length:', process.env.RESEND_API_KEY?.length);
    console.log('Contact Email:', process.env.CONTACT_TO_EMAIL);

    const { subject, body } = await request.json();
    console.log('Received data:', { subject: subject?.substring(0, 50), body: body?.substring(0, 50) });

    // Validate required fields
    if (!subject || !body) {
      console.log('Validation failed: missing subject or body');
      return NextResponse.json(
        { error: 'Subject and body are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Resend instance created');

    // Send email using Resend
    console.log('Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default domain for testing
      to: process.env.CONTACT_TO_EMAIL || 'asethi@gmail.com',
      subject: subject,
      text: body,
    });

    console.log('Resend response received:', { hasData: !!data, hasError: !!error });
    if (error) {
      console.error('Resend error details:', error);
    }

    if (error) {
      return NextResponse.json(
        { error: `Failed to send email: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    console.log('Email sent successfully');
    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}