"use client";

import { useState } from "react";

export default function ReviewCard({ review, onToggle }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = async (e) => {
    const newValue = e.target.checked;
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      await onToggle(review.id, newValue);
      setSaved(true);
    } catch (err) {
      setError("Failed to save");
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <li className="border p-4 rounded shadow">
      <p className="font-bold">{review.guest}</p>
      <p className="italic text-sm text-gray-500">{review.listing}</p>
      <p className="mt-2">{review.review}</p>
      <p className="text-sm text-gray-500 mt-2">
        Type: {review.type} | Date: {review.submittedAt}
      </p>

      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={review.showOnWebsite}
          onChange={handleChange}
        />
        <span>
          Show on Website{" "}
          {saving && <span className="text-xs text-gray-400">(saving...)</span>}
          {saved && <span className="text-green-600 text-xs ml-1">Saved</span>}
          {error && <span className="text-red-600 text-xs ml-1">{error}</span>}
        </span>
      </label>
    </li>
  );
}