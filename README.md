# Flex Living Reviews Dashboard

A manager-facing dashboard to review, filter, and approve guest reviews for Flex Living properties, plus a public "What Guests Are Saying" page per listing.  
Integrates with the (sandboxed) Hostaway API, falls back to mock data, and simulates persistence on toggles. Built with Next.js 15 (App Router) and Tailwind CSS.

---

## 🚀 Quick Start

1. **Clone & Install**  
   ```bash
   git clone <repo-url>
   cd flex-living-dashboard
   npm install
   ```

2. **Environment**  
   Create a `.env.local` in project root:  
   ```
   HOSTAWAY_API_KEY=<your_key>
   HOSTAWAY_ACCOUNT_ID=<your_account_id>
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Run Dev Server**  
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

---

## 🗂️ Project Structure

```
/src
 └── app
      ├── layout.js             # Root layout & global UI
      ├── globals.css           # Tailwind & global styles
      ├── page.js               # Manager dashboard (filters & cards)
      ├── api
      │    └── reviews
      │         ├── hostaway
      │         │    └── route.js   # GET /api/reviews/hostaway
      │         └── [id]
      │              └── route.js   # PATCH /api/reviews/:id
      └── properties
           └── [listing]
                 └── page.js         # Public property page, approved reviews only

/components
 ├── FilterBar.js               # Listing, text, rating, category & date filters
 └── ReviewCard.js              # Review display + “Show on Website” toggle

/mock
 └── reviews.json               # Fallback Hostaway response

.google-reviews-findings.md     # Notes on Google Reviews exploration
.env.local                      # Secrets (gitignored)
.gitignore                      # Ignored files
jsconfig.json                   # Path alias config
.eslint.config.mjs              # Linting rules
README.md                       # This documentation
```

---

## 🧰 Tech Stack

- Next.js 15 with App Router
- React Hooks (useEffect, useState)
- Tailwind CSS for styling
- Fetch API for server-side & client-side data
- Mock JSON fallback & simulated PATCH endpoint

---

## 📐 Key Decisions

- **Mock + Live Fallback**  
  GET /api/reviews/hostaway attempts the sandbox API, falls back to mock/reviews.json on failure, and surfaces a banner when mock data is in use.

- **Toggle Persistence Simulation**  
  PATCH /api/reviews/:id logs changes server-side and returns success; UI shows inline “saving…/Saved” or error feedback.

- **Componentization**  
  Extracted FilterBar and ReviewCard for clarity, reuse, and easier maintenance.

- **Responsive & Accessible**  
  Mobile-first Tailwind layouts, full-width form controls on small screens.

---

## 🔄 API Behavior

- **GET /api/reviews/hostaway**  
  - Live: Fetches from https://api.hostaway.com/v1/reviews?accountId={HOSTAWAY_ACCOUNT_ID}
  - Fallback: On missing credentials or network error, returns mock/reviews.json.
  - Response:  
    ```json
    {
      "reviews": [
        {
          "id": 7453,
          "listing": "2B N1 A - 29 Shoreditch Heights",
          "guest": "Shane Finkelstein",
          "review": "Shane and family ...",
          "type": "host-to-guest",
          "submittedAt": "2020-08-21 22:45:14",
          "status": "published",
          "rating": 10,
          "categories": [ ... ],
          "showOnWebsite": true
        },
        ...
      ],
      "source": "live" | "mock"
    }
    ```

- **PATCH /api/reviews/:id**  
  - Purpose: Simulate persisting the showOnWebsite flag.
  - Input: `{ "showOnWebsite": true | false }`
  - Response: `{ "success": true }` or HTTP 500 on failure.

---

## 📝 Google Reviews Exploration

We investigated the Google Places API for fetching public reviews:
- Requires enabling Places API, billing account, and mapping each property to a Place ID.
- Out of scope for this MVP due to setup complexity and billing.
- Could be added later using server-side calls to `https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=reviews&key={API_KEY}`.


---

## 🎯 Stretch Goals

- Advanced Filters: Minimum rating selector, category dropdown, date-range picker
- Visual Insights: Charts showing rating trends or category breakdowns
- Real Persistence: Hook up to a database or headless CMS for real data saving

---

## 📄 License & Thanks

Built as part of the Flex Living Developer Assessment.  
Thank you for reviewing and happy coding!
=======
# flex-living-dashboard
>>>>>>> 786f834dc3de9a6076f4d7edd7200231a56449ba
