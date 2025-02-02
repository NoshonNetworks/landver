import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_KEY?.split('-')[1] || 'us17',
});

export async function POST(request) {
  // console.log('=== MAILCHIMP CONFIG ===');
  // console.log('Server:', process.env.MAILCHIMP_API_KEY?.split('-')[1]);
  // console.log('Audience ID:', process.env.MAILCHIMP_AUDIENCE_ID);

  try {
    const { email } = await request.json();
    // console.log('Received email:', email);

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Mailchimp subscribtion
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: 'subscribed',
        status_if_new: 'subscribed' // Handle existing members
      }
    );

    console.log('Mailchimp response:', response);
    return NextResponse.json(
      { message: 'Subscription successful', data: response },
      { status: 201 }
    );

  } catch (error) {
    console.error('=== ERROR DETAILS ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Handle Mailchimp-specific errors
    if (error.response?.body) {
      // console.error('Mailchimp error details:', error.response.body);
      return NextResponse.json(
        {
          error: `${error.response.body.title}: ${error.response.body.detail}`,
        },
        { status: error.status || 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: error.message || 'Failed to process subscription' },
      { status: 500 }
    );
  }
}