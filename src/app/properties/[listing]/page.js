export default async function PropertyPage({ params }) {
  const { listing } = params;

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  let reviews = [];
  try {
    const res = await fetch(`${baseURL}/api/reviews/hostaway`, {
      cache: 'no-store',
    });
    const data = await res.json();
    reviews = data.reviews || [];
  } catch (err) {
    console.error("Failed to fetch reviews:", err.message);
  }

  const approvedReviews = reviews.filter(
    (r) =>
      r.listing === decodeURIComponent(listing) && r.showOnWebsite === true
  );

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {decodeURIComponent(listing)}
      </h1>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Google Rating: <span className="font-semibold">4.7</span> ★ (112 reviews)
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">What Guests Are Saying</h2>

      {approvedReviews.length === 0 ? (
        <p className="text-gray-500">No reviews to display yet.</p>
      ) : (
        <ul className="space-y-4">
          {approvedReviews.map((review) => (
            <li key={review.id} className="border p-4 rounded bg-white shadow">
              <p className="font-semibold">{review.guest}</p>
              <p className="mt-2">{review.review}</p>
              <p className="text-sm text-gray-500 mt-2">{review.submittedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}