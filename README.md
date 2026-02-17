# 🌍 SADC Directory — Southern Africa's Business Directory

A production-ready, full-stack web application for browsing, searching, and listing businesses and organisations across all 16 SADC member states.

## Features
- 🔍 Search 10,000+ listings across 16 countries
- 🗺️ Interactive map view with OpenStreetMap
- 📱 Mobile-first, responsive design
- 🔐 User authentication (Supabase Auth)
- ❤️ Save favorites
- ⭐ Reviews and ratings
- 🛡️ Secure admin panel with RLS
- ⭐ Featured & verified listing system
- 💰 Ready for monetisation

## Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Row Level Security)
- **Maps:** OpenStreetMap via react-leaflet
- **Hosting:** Vercel

## Deployment
See **DEPLOYMENT_GUIDE.md** for step-by-step instructions (works from mobile phone only, no PC required).

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## Project Structure
```
sadc-directory/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Homepage
│   │   ├── search/            # Search & filter
│   │   ├── listing/[id]/      # Listing detail
│   │   ├── country/[code]/    # Country page
│   │   ├── category/[slug]/   # Category page
│   │   ├── auth/              # Login/Register/Reset
│   │   ├── admin/             # Admin panel
│   │   ├── dashboard/         # User dashboard
│   │   ├── favorites/         # Saved listings
│   │   └── submit-listing/    # Submit form
│   ├── components/            # React components
│   │   ├── ui/               # Navbar, Footer, HeroSection
│   │   ├── listing/          # ListingCard, FeaturedListings
│   │   ├── search/           # SearchFilters
│   │   └── map/              # ListingMap, SearchMap
│   ├── lib/supabase/         # Supabase clients
│   └── types/                # TypeScript types
├── supabase/
│   ├── migrations/
│   │   ├── 001_schema.sql    # Full database schema
│   │   └── 002_rls.sql      # Row Level Security policies
│   └── seeds/
│       ├── 001_reference_data.sql  # Countries & categories
│       └── 002_listings_seed.sql   # 10,000+ listings
└── DEPLOYMENT_GUIDE.md       # Mobile-friendly deployment guide
```
