export async function GET(request: Request) {
  return new Response("ok", { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ ok: true, body });
}

export function DELETE() {
  return new Response(null, { status: 204 });
}
