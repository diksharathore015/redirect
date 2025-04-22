 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const headers = {
      'Access-Control-Allow-Origin': '*', // Allow all origins or specify a specific origin
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Allow specific methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
    };
    // Example: Forwarding the request to an external API
    const apiUrl = "http://43.204.144.192:8000/enquiry/"; // Replace with your API URL
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*' , // Allow all origins or specify a specific origin
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Allow specific methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
     
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from external API:", errorText);
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const result = await response.json();
    // return NextResponse.json(result, { status: 200 });
        // Send back the result with the CORS headers
        return NextResponse.json(result, { status: 200, headers });

  } catch (error: any) {
    console.error("Error in API route:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

  