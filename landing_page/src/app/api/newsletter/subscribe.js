export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { email } = req.body;
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
  
    const API_KEY = "154f663d301447a0036f90c188c62ab6-us9";
    const AUDIENCE_ID = "e509e22d93";
    const DATACENTER = API_KEY.split("-")[1]; // Extract Mailchimp data center
  
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/`;
  
    const data = {
      email_address: email,
      status: "subscribed",
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${API_KEY}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200 || response.status === 400) {
        return res.status(200).json({ message: "Subscription successful!" });
      } else {
        return res.status(response.status).json({ message: "Subscription failed." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }  