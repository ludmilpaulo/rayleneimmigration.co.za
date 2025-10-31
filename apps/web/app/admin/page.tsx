'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    activeApplications: 0,
    pendingDocuments: 0,
    pendingBookings: 0,
    totalRevenue: 0,
  })

  // Fetch stats from API
  useEffect(() => {
    // TODO: Implement API call to get stats
    // This would fetch from /api/admin/dashboard/
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-navy">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of all operations</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-emerald">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Active Applications</h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-primary-emerald">{stats.activeApplications}</p>
            <p className="text-sm text-gray-500 mt-1">Across all statuses</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-gold">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Documents Pending</h3>
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-3xl font-bold text-primary-gold">{stats.pendingDocuments}</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-royal">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Upcoming Bookings</h3>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-primary-royal">{stats.pendingBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Next 7 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-navy">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-primary-navy">R{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-navy">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/applications"
                className="bg-primary-navy text-white p-4 rounded-lg text-center hover:bg-primary-royal transition font-medium"
              >
                View Applications
              </Link>
              <Link
                href="/admin/clients"
                className="bg-primary-emerald text-white p-4 rounded-lg text-center hover:opacity-90 transition font-medium"
              >
                Manage Clients
              </Link>
              <Link
                href="/admin/bookings"
                className="bg-primary-royal text-white p-4 rounded-lg text-center hover:opacity-90 transition font-medium"
              >
                View Bookings
              </Link>
              <Link
                href="/admin/invoices"
                className="bg-primary-gold text-primary-navy p-4 rounded-lg text-center hover:opacity-90 transition font-medium"
              >
                Manage Invoices
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-navy">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-emerald rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New application submitted</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center text-primary-navy font-bold">
                  D
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Document approved</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-navy">Applications by Status</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart placeholder - implement with Chart.js or Recharts
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-navy">Revenue Trend</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart placeholder - implement with Chart.js or Recharts
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

