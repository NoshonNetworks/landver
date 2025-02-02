import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = API_KEY.split("-")[1];

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/`;

    const data = {
      email_address: email,
      status: "subscribed",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200 || response.status === 400) {
      return NextResponse.json({ message: "Subscription successful!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Subscription failed." }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}