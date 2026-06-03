import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const appScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!appScriptUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing APPS_SCRIPT_URL" },
        { status: 500 },
      );
    }

    const payload = await request.json();
    const response = await fetch(appScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { ok: false, error: "Apps Script request failed", detail: text },
        { status: 502 },
      );
    }

    const text = await response.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : { ok: true };
    } catch {
      data = { ok: true, raw: text };
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
