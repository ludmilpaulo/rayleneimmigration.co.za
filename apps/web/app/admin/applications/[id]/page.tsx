'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { applicationsApi } from '@/lib/api'

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [application, setApplication] = useState<any>(null)
  const [applicationTypes, setApplicationTypes] = useState<any[]>([])
  const [formData, setFormData] = useState<any>({
    application_type: '',
    status: 'DRAFT',
    priority: 'NORMAL',
    notes: '',
    internal_notes: '',
    dha_ref: '',
    assigned_to: '',
  })

  const fetchApplication = useCallback(async () => {
    try {
      const response = await applicationsApi.get(id)
      setApplication(response.data)
      setFormData({
        application_type: response.data.application_type?.id || '',
        status: response.data.status,
        priority: response.data.priority,
        notes: response.data.notes || '',
        internal_notes: response.data.internal_notes || '',
        dha_ref: response.data.dha_ref || '',
        assigned_to: response.data.assigned_to?.id || '',
      })
    } catch (error) {
      console.error('Failed to fetch application:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  const fetchApplicationTypes = useCallback(async () => {
    try {
      const response = await applicationsApi.types()
      setApplicationTypes(response.data.results || response.data)
    } catch (error) {
      console.error('Failed to fetch application types:', error)
    }
  }, [])

  useEffect(() => {
    fetchApplication()
    fetchApplicationTypes()
  }, [fetchApplication, fetchApplicationTypes])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await applicationsApi.update(id, formData)
      router.push('/admin/applications')
    } catch (error) {
      console.error('Failed to update application:', error)
      alert('Failed to update application. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusUpdate = async (status: string) => {
    if (!confirm(`Change status to ${status}?`)) return
    setSaving(true)
    try {
      await applicationsApi.updateStatus(id, { status, note: 'Status updated by admin' })
      fetchApplication()
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-navy">
              Application Details
            </h1>
            <p className="text-gray-600 mt-2">
              ID: {application?.id?.substring(0, 8)}...
            </p>
          </div>
          <Link
            href="/admin/applications"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6 text-primary-navy">
                  Application Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Type *
                    </label>
                    <select
                      value={formData.application_type}
                      onChange={(e) => setFormData({ ...formData, application_type: e.target.value })}
                      disabled={application?.status !== 'DRAFT'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                      required
                    >
                      <option value="">Select type</option>
                      {applicationTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="INTAKE">Intake</option>
                        <option value="IN_REVIEW">In Review</option>
                        <option value="DOCS_PENDING">Documents Pending</option>
                        <option value="READY_TO_SUBMIT">Ready to Submit</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="DHA_PROCESSING">DHA Processing</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                      >
                        <option value="LOW">Low</option>
                        <option value="NORMAL">Normal</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DHA Reference
                    </label>
                    <input
                      type="text"
                      value={formData.dha_ref}
                      onChange={(e) => setFormData({ ...formData, dha_ref: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                      placeholder="DHA123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Visible to Client)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                      placeholder="General notes about this application..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Internal Notes (Staff Only)
                    </label>
                    <textarea
                      value={formData.internal_notes}
                      onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                      placeholder="Internal notes not visible to client..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary-navy text-white py-3 rounded-lg font-semibold hover:bg-primary-royal transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary-navy">
                Client Information
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <p className="text-gray-900">
                    {application?.client?.first_name} {application?.client?.last_name}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-gray-900">{application?.client?.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-900">{application?.client?.phone || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Status History */}
            {application?.status_history && application.status_history.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary-navy">
                  Status History
                </h3>
                <div className="space-y-3">
                  {application.status_history
                    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((history: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-navy mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{history.status}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(history.created_at).toLocaleString()}
                          </p>
                          {history.note && (
                            <p className="text-xs text-gray-600 mt-1">{history.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quick Status Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary-navy">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusUpdate('APPROVED')}
                  className="w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                >
                  ✓ Mark as Approved
                </button>
                <button
                  onClick={() => handleStatusUpdate('REJECTED')}
                  className="w-full text-left px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                >
                  ✗ Mark as Rejected
                </button>
                <button
                  onClick={() => router.push(`/admin/applications/${id}/documents`)}
                  className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                >
                  📄 Manage Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

