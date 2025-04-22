import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";

    const apiUrl = `http://43.204.144.192:8000/cities-with-courses/?page=${page}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json"},
    });

    // ✅ Check if response is empty before parsing JSON
    const text = await response.text();
    if (!text) {
      console.error("Error: Empty response from API");
      return NextResponse.json({ error: "Empty response from backend" }, { status: 500 });
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError, "Response text:", text);
      return NextResponse.json({ error: "Invalid JSON response from backend" }, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("Error in API route:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
