import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, phone, location, propertyType, billRange, message, pageUrl, userIp, utmSource, utmMedium, utmCampaign } = await req.json();

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const htmlBody = `
      <h2>New Website Enquiry – Ski-G Energies</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Location</td><td style="padding:8px;border:1px solid #ddd;">${location}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Property Type</td><td style="padding:8px;border:1px solid #ddd;">${propertyType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Bill Range</td><td style="padding:8px;border:1px solid #ddd;">${billRange || 'Not provided'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${message || 'Not provided'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Timestamp</td><td style="padding:8px;border:1px solid #ddd;">${timestamp}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Page URL</td><td style="padding:8px;border:1px solid #ddd;">${pageUrl || 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">User IP</td><td style="padding:8px;border:1px solid #ddd;">${userIp || 'N/A'}</td></tr>
        ${utmSource ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">UTM Source</td><td style="padding:8px;border:1px solid #ddd;">${utmSource}</td></tr>` : ''}
        ${utmMedium ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">UTM Medium</td><td style="padding:8px;border:1px solid #ddd;">${utmMedium}</td></tr>` : ''}
        ${utmCampaign ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">UTM Campaign</td><td style="padding:8px;border:1px solid #ddd;">${utmCampaign}</td></tr>` : ''}
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ski-G Website <onboarding@resend.dev>',
        to: ['m.imthiaz@ski-g.com'],
        subject: 'New Website Enquiry – Ski-G Energies',
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: data }), {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-contact-email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
