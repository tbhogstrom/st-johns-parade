import type { APIRoute } from 'astro';
import { appendToSheet } from '../../../lib/googleSheets';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    const values = [
      [
        data.companyName,
        data.contactName,
        data.email,
        data.phone,
        data.sponsorshipLevel,
        data.message || '',
        new Date().toISOString()
      ]
    ];

    await appendToSheet(
      import.meta.env.GOOGLE_SHEET_ID,
      'Sponsors!A:G',
      values
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(JSON.stringify({ error: 'Failed to process form submission' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};