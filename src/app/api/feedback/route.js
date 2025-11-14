import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();

    // Send data to Google Apps Script
    const scriptResponse = await fetch("https://script.google.com/macros/s/AKfycbxZdVtUMfsnTlEjUnQpGouh3uUIJ9-Npq9xVjuh1vDadI-eUrj8kPviJ5Zdv2UrUNbi/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!scriptResponse.ok) {
      throw new Error('Failed to save to Google Sheet');
    }

    // Check if overall rating is 5 stars
    const shouldRedirectToGMB = parseInt(formData.overallRating) === 5;

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      redirectToGMB: shouldRedirectToGMB,
      gmbUrl: shouldRedirectToGMB ? "https://shorturl.at/0QdEW" : null
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit feedback',
        details: error.message 
      },
      { status: 500 }
    );
  }
}