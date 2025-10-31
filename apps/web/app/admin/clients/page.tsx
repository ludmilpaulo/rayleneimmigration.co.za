'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { authApi } from '@/lib/api'

interface Client {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  created_at: string
  client_profile?: {
    citizenship: string
    date_of_birth: string
  }
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // TODO: Implement API call to get clients
    // For now, show empty state
    setLoading(false)
  }, [])

  const filteredClients = clients.filter(
    (client) =>
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-navy">Clients</h1>
            <p className="text-gray-600 mt-2">Manage all registered clients</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
            />
            <button className="px-4 py-2 bg-primary-navy text-white rounded-lg hover:bg-primary-royal transition">
              Search
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading clients...</div>
          ) : filteredClients.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No clients found. Client management will be available once API is implemented.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Citizenship
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {client.first_name} {client.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{client.phone || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {client.client_profile?.citizenship || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="text-primary-navy hover:text-primary-royal mr-4"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-navy">
            <div className="text-sm font-medium text-gray-600">Total Clients</div>
            <div className="text-3xl font-bold text-primary-navy mt-2">{clients.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-emerald">
            <div className="text-sm font-medium text-gray-600">Active This Month</div>
            <div className="text-3xl font-bold text-primary-emerald mt-2">0</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-gold">
            <div className="text-sm font-medium text-gray-600">With Applications</div>
            <div className="text-3xl font-bold text-primary-gold mt-2">0</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-royal">
            <div className="text-sm font-medium text-gray-600">Pending Documents</div>
            <div className="text-3xl font-bold text-primary-royal mt-2">0</div>
          </div>
        </div>
      </div>
    </main>
  )
}
