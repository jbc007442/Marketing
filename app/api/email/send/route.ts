import { NextResponse } from 'next/server';

type Contact = {
  name: string;
  email: string;
};

function getTemplate(template: string, contact: Contact) {
  switch (template) {
    case 'welcome':
      return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:40px;border:1px solid #e5e5e5;">
        <h1 style="color:#111827;">
          Welcome ${contact.name} 👋
        </h1>

        <p style="font-size:16px;color:#4b5563;">
          Thank you for joining our platform.
        </p>

        <a
          href="https://officialtarun.in"
          style="
            display:inline-block;
            background:#111827;
            color:#fff;
            padding:12px 24px;
            text-decoration:none;
            border-radius:8px;
            margin-top:20px;
          "
        >
          Get Started
        </a>
      </div>
      `;

    case 'offer':
      return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:40px;background:#f8fafc;">
        <h1 style="color:#2563eb;">
          Special Offer 🎉
        </h1>

        <p>
          Hello ${contact.name},
        </p>

        <p>
          Enjoy <strong>30% OFF</strong> on all our services.
        </p>

        <a
          href="https://officialtarun.in"
          style="
            display:inline-block;
            background:#2563eb;
            color:#fff;
            padding:12px 24px;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Claim Offer
        </a>
      </div>
      `;

    case 'travel':
      return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:40px;">
        <h1>
          Amazing Travel Deals ✈️
        </h1>

        <p>
          Hello ${contact.name},
        </p>

        <p>
          Discover our latest flight and hotel offers.
        </p>

        <a
          href="https://officialtarun.in"
          style="
            display:inline-block;
            background:#16a34a;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Explore Deals
        </a>
      </div>
      `;

    default:
      return `
      <h1>Hello ${contact.name}</h1>
      `;
  }
}

export async function POST(req: Request) {
  try {
    const { contacts, template } = await req.json();

    for (const contact of contacts) {
      const html = getTemplate(template, contact);

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: {
            name: 'Official Tarun',
            email: process.env.BREVO_SENDER_EMAIL!,
          },
          to: [
            {
              email: contact.email,
              name: contact.name,
            },
          ],
          subject: 'Official Tarun Marketing',
          htmlContent: html,
        }),
      });

      const data = await response.json();

      console.log('Brevo Status:', response.status);
      console.log('Brevo Response:', data);
    }

    return NextResponse.json({
      success: true,
      message: 'Campaign sent successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send emails',
      },
      {
        status: 500,
      }
    );
  }
}
