export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { showOnWebsite } = body;

    console.log(`✅ Simulated save: review ${id} -> showOnWebsite = ${showOnWebsite}`);

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to simulate save", err);
    return new Response("Failed to save", { status: 500 });
  }
}