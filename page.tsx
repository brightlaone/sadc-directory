// app/page.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import Button from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // Get featured listings
  const { data: featuredListings } = await supabase
    .from('approved_listings')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  // Get recent listings
  const { data: recentListings } = await supabase
    .from('approved_listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  // Get categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
    .limit(8)

  // Get countries with listing counts
  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .order('name')

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover SADC Businesses
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            The complete directory of businesses and organizations across all 16 SADC member states
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>10,000+ Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>16 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span>20+ Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/listings?category_id=${category.id}`}
                  className="p-6 bg-gray-50 rounded-lg hover:bg-primary-50 hover:shadow-md transition-all text-center"
                >
                  <div className="text-4xl mb-2">{category.icon || '📁'}</div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/listings">
                <Button variant="outline">View All Categories</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Listings */}
      {featuredListings && featuredListings.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Listings</h2>
              <Link href="/listings?is_featured=true">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Listings */}
      {recentListings && recentListings.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recently Added</h2>
              <Link href="/listings">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Countries Section */}
      {countries && countries.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore by Country</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {countries.map((country) => (
                <Link
                  key={country.id}
                  href={`/listings?country_id=${country.id}`}
                  className="p-4 bg-white rounded-lg hover:shadow-md transition-all text-center"
                >
                  <div className="text-4xl mb-2">{country.flag_emoji}</div>
                  <h3 className="font-medium text-xs">{country.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">List Your Business Today</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of businesses on SADC Directory and reach customers across Southern Africa
          </p>
          <Link href="/listings/new">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Add Your Listing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
