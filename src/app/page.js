"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const [allReviews, setAllReviews] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedListing, setSelectedListing] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [timeRange, setTimeRange] = useState("all");
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews/hostaway");
        const data = await res.json();
        setAllReviews(data.reviews);
        setUsingMockData(data.source === "mock");
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  const listings = Array.isArray(allReviews)
    ? Array.from(new Set(allReviews.map((r) => r.listing)))
    : [];

  const filtered = allReviews
    .filter((r) => (selectedListing === "All" ? true : r.listing === selectedListing))
    .filter((r) => r.review?.toLowerCase().includes(filterText.toLowerCase()))
    .filter((r) => (selectedRating ? r.rating >= selectedRating : true))
    .filter((r) =>
      selectedCategory
        ? r.categories?.some((c) => c.category === selectedCategory)
        : true
    )
    .filter((r) => {
      if (timeRange === "all") return true;
      const submittedDate = new Date(r.submittedAt);
      const monthsAgo =
        timeRange === "3m" ? 3 : timeRange === "6m" ? 6 : 12;
      const dateThreshold = new Date();
      dateThreshold.setMonth(dateThreshold.getMonth() - monthsAgo);
      return submittedDate >= dateThreshold;
    });

  return (
    <main className="p-6">
      {usingMockData && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-4">
          ⚠️ Using mock data – live API not reachable.
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      <FilterBar
        listings={listings}
        selectedListing={selectedListing}
        onListingChange={setSelectedListing}
        filterText={filterText}
        onFilterChange={setFilterText}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      <ul className="space-y-4">
        {filtered.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onToggle={async (id, newValue) => {
              const res = await fetch(`/api/reviews/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ showOnWebsite: newValue })
              });
              if (res.ok) {
                setAllReviews((prev) =>
                  prev.map((r) =>
                    r.id === id ? { ...r, showOnWebsite: newValue } : r
                  )
                );
              } else {
                alert("❌ Failed to save checkbox status.");
              }
            }}
          />
        ))}
      </ul>
    </main>
  );
}