import { NextResponse } from "next/server";

export async function POST() {
  const token = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env.POLAR_PRODUCT_ID;
  if (!token || !productId) {
    return NextResponse.json(
      { error: "Billing is not configured. Set POLAR_ACCESS_TOKEN and POLAR_PRODUCT_ID on the server." },
      { status: 503 }
    );
  }

  const origin = process.env.POLAR_SERVER === "production"
    ? "https://api.polar.sh"
    : "https://sandbox-api.polar.sh";

  try {
    const response = await fetch(`${origin}/v1/checkouts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [productId],
        success_url: process.env.POLAR_SUCCESS_URL || "http://localhost:3000/settings/billing?checkout_id={CHECKOUT_ID}",
        return_url: process.env.POLAR_RETURN_URL || "http://localhost:3000",
        metadata: { application: "pixelloom" },
        locale: "en",
      }),
      cache: "no-store",
    });
    const payload = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "Polar checkout could not be created.", details: payload }, { status: response.status });
    }
    return NextResponse.json({ url: payload.url });
  } catch {
    return NextResponse.json({ error: "Unable to reach Polar billing service." }, { status: 502 });
  }
}
