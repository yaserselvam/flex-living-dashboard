export default function FilterBar({
  listings,
  selectedListing,
  onListingChange,
  filterText,
  onFilterChange,
  selectedRating,
  onRatingChange,
  selectedCategory,
  onCategoryChange,
  timeRange,
  onTimeRangeChange
}) {
  return (
    <form className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
      {/* Listing Dropdown */}
      <div>
        <label className="block text-sm font-medium">Filter by Property:</label>
        <select
          className="mt-1 border px-2 py-1 rounded w-full"
          value={selectedListing}
          onChange={(e) => onListingChange(e.target.value)}
        >
          <option value="All">All</option>
          {listings.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Text Search */}
      <div>
        <label className="block text-sm font-medium">Search Review Text:</label>
        <input
          type="text"
          className="mt-1 border px-2 py-1 rounded w-full"
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="e.g. clean, noisy"
        />
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium">Min Rating:</label>
        <select
          className="mt-1 border px-2 py-1 rounded w-full"
          value={selectedRating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
        >
          <option value={0}>All</option>
          {[10, 9, 8, 7, 6].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium">Review Category:</label>
        <select
          className="mt-1 border px-2 py-1 rounded w-full"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="cleanliness">Cleanliness</option>
          <option value="communication">Communication</option>
          <option value="location">Location</option>
          <option value="respect_house_rules">House Rules</option>
        </select>
      </div>

      {/* Time Filter */}
      <div>
        <label className="block text-sm font-medium">Submitted In:</label>
        <select
          className="mt-1 border px-2 py-1 rounded w-full"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="all">All time</option>
          <option value="3m">Last 3 months</option>
          <option value="6m">Last 6 months</option>
          <option value="12m">Last 12 months</option>
        </select>
      </div>
    </form>
  );
}