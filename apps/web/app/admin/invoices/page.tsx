'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminInvoicesPage() {
  const [invoices] = useState([
    // This would be populated from API
  ])

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-navy">Invoices</h1>
            <p className="text-gray-600 mt-2">Manage all billing invoices</p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          {invoices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No invoices found. Invoice management features coming soon.
            </div>
          ) : (
            <p>Invoice list will be displayed here</p>
          )}
        </div>
      </div>
    </main>
  )
}

