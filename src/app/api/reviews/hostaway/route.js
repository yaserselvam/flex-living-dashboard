import mockData from "@/mock/reviews.json";

export async function GET() {
  const accountId = process.env.HOSTAWAY_ACCOUNT_ID;
  const apiKey = process.env.HOSTAWAY_API_KEY;

  const url = `https://api.hostaway.com/v1/reviews?accountId=${accountId}`;

  try {
    if (!accountId || !apiKey) throw new Error("Missing API credentials");

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    const json = await res.json();

    if (!res.ok || !json.result) {
      throw new Error("Invalid Hostaway API response");
    }

    const reviews = json.result.map((r) => ({
      id: r.id,
      listing: r.listingName,
      guest: r.guestName,
      review: r.publicReview,
      type: r.type,
      submittedAt: r.submittedAt,
      status: r.status,
      rating: r.rating,
      categories: r.reviewCategory,
      showOnWebsite: r.showOnWebsite ?? false
    }));

    return Response.json({ reviews });
  } catch (err) {
    console.warn("⚠️ Falling back to mock data:", err.message);

    const fallback = mockData.result.map((r) => ({
    id: r.id,
    listing: r.listingName,
    guest: r.guestName,
    review: r.publicReview,
    type: r.type,
    submittedAt: r.submittedAt,
    status: r.status,
    rating: r.rating,
    categories: r.reviewCategory,
    showOnWebsite: r.showOnWebsite ?? false
    }));

    return Response.json({ reviews: fallback, source: "mock" });
  }
}