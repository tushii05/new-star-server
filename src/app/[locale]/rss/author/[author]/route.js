import getLanguageId from "@/utils/langId";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { author, locale } = params;
  const lang_id = await getLanguageId(locale);

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/api/user/rss/${author}${
        lang_id ? `/${lang_id}` : {}
      }`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch the RSS feed " + author);
    }

    const data = await response.text();
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
