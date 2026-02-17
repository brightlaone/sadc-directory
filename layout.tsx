// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { createClient } from '@/lib/supabase/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SADC Directory - Business & Organizations Directory',
  description: 'Discover businesses and organizations across SADC member states',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user: authUser } } = await supabase.auth.getUser()
  
  let user = null
  if (authUser) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single()
    user = data
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">SADC Directory</h3>
                <p className="text-sm text-gray-400">
                  Your trusted directory for businesses and organizations across Southern Africa.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/listings" className="hover:text-white">Browse</a></li>
                  <li><a href="/map" className="hover:text-white">Map View</a></li>
                  <li><a href="/about" className="hover:text-white">About</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">For Businesses</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/listings/new" className="hover:text-white">Add Listing</a></li>
                  <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                  <li><a href="/help" className="hover:text-white">Help</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/terms" className="hover:text-white">Terms</a></li>
                  <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              © 2026 SADC Directory. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
