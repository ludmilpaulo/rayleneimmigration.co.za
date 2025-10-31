import Link from 'next/link'

export default function AppDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary-navy">
          Client Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-primary-navy">
              Active Applications
            </h2>
            <p className="text-4xl font-bold text-primary-emerald">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-primary-navy">
              Documents Pending
            </h2>
            <p className="text-4xl font-bold text-primary-gold">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-primary-navy">
              Upcoming Bookings
            </h2>
            <p className="text-4xl font-bold text-primary-royal">0</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-navy">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/app/applications/new"
                className="block w-full bg-primary-navy text-white py-3 px-4 rounded-lg text-center hover:bg-primary-royal transition"
              >
                Start New Application
              </Link>
              <Link
                href="/app/bookings/new"
                className="block w-full bg-white border-2 border-primary-navy text-primary-navy py-3 px-4 rounded-lg text-center hover:bg-gray-50 transition"
              >
                Book Consultation
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-navy">
              Recent Activity
            </h2>
            <p className="text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    </main>
  )
}

