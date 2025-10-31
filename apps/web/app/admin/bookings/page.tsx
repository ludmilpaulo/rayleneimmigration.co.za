'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { bookingsApi } from '@/lib/api'

interface Booking {
  id: string
  client_email: string
  slot_start: string
  slot_end: string
  status: string
  type: string
  notes: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchBookings = useCallback(async () => {
    try {
      const params: any = {}
      if (filter !== 'all') {
        params.status = filter
      }
      const response = await bookingsApi.list(params)
      setBookings(response.data.results || response.data)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      SCHEDULED: 'bg-blue-100 text-blue-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-navy">Bookings</h1>
            <p className="text-gray-600 mt-2">Manage all consultation bookings</p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['all', 'SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === status
                    ? 'bg-primary-navy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No bookings found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.client_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.slot_start).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.slot_start).toLocaleTimeString()} - {new Date(booking.slot_end).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{booking.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/bookings/${booking.id}`}
                          className="text-primary-navy hover:text-primary-royal"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-royal">
            <div className="text-sm font-medium text-gray-600">Upcoming Today</div>
            <div className="text-3xl font-bold text-primary-royal mt-2">
              {bookings.filter(b => {
                const date = new Date(b.slot_start)
                return date.toDateString() === new Date().toDateString() && b.status === 'SCHEDULED'
              }).length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-emerald">
            <div className="text-sm font-medium text-gray-600">This Week</div>
            <div className="text-3xl font-bold text-primary-emerald mt-2">
              {bookings.filter(b => {
                const date = new Date(b.slot_start)
                const today = new Date()
                const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                return date >= today && date <= weekFromNow
              }).length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-navy">
            <div className="text-sm font-medium text-gray-600">Completed</div>
            <div className="text-3xl font-bold text-primary-navy mt-2">
              {bookings.filter(b => b.status === 'COMPLETED').length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-gold">
            <div className="text-sm font-medium text-gray-600">Cancelled</div>
            <div className="text-3xl font-bold text-primary-gold mt-2">
              {bookings.filter(b => b.status === 'CANCELLED').length}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
