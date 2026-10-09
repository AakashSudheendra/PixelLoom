import { NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

type AutosaveRequest = {
  canvasId?: unknown;
  objectCount?: unknown;
};

export async function POST(request: Request) {
  let body: AutosaveRequest;

  try {
    body = (await request.json()) as AutosaveRequest;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body.canvasId !== "string" || body.canvasId.trim().length === 0 || body.canvasId.length > 128) {
    return NextResponse.json({ error: "canvasId must be a non-empty string of at most 128 characters." }, { status: 400 });
  }

  const objectCount = body.objectCount ?? 0;
  if (typeof objectCount !== "number" || !Number.isInteger(objectCount) || objectCount < 0 || objectCount > 100_000) {
    return NextResponse.json({ error: "objectCount must be an integer between 0 and 100000." }, { status: 400 });
  }

  try {
    const result = await inngest.send({
      name: "canvas/autosave.requested",
      data: { canvasId: body.canvasId.trim(), objectCount },
    });

    return NextResponse.json({ accepted: true, ids: result.ids }, { status: 202 });
  } catch {
    return NextResponse.json({ error: "Unable to queue autosave workflow." }, { status: 502 });
  }
}
