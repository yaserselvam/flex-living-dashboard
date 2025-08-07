## Google Reviews Integration (Exploration)

### ✅ What We Explored:
- Google Places API for fetching review data about properties listed on Flex Living.
- Specifically, we aimed to fetch guest reviews, star ratings, and review counts.

### ❌ What’s Not Feasible:
- Google does **not allow public access to individual review content** unless:
  - You’re authenticated as the business owner in Google My Business
  - You have ownership verification through Google Cloud
- Places API only returns **aggregated data** (rating + review count)

### ✅ What’s Possible:
- We can fetch:
  - Place name
  - Star rating (e.g. 4.6)
  - Total number of reviews (e.g. 128)
- This data can be used to supplement the internal dashboard

### 💡 Recommendation:
- Do **not integrate Google Reviews into the guest-facing display**
- Consider optionally adding average Google ratings to the **Manager Dashboard** as a secondary performance indicator

### 📎 Links:
- Google Places API Docs: https://developers.google.com/maps/documentation/places/web-service/overview