# Admin & Client Portal Implementation Guide

## Current Status

### ✅ Completed
1. **Authentication System**
   - AuthContext with role-based access
   - Login with automatic role-based redirect
   - JWT token management
   - Protected routes pattern

2. **Admin Pages**
   - `/admin` - Dashboard overview (basic)
   - `/admin/applications` - List all applications with filtering
   - `/admin/applications/[id]` - Full CRUD for individual application
   - `/admin/clients` - Client list page (basic)
   - `/admin/bookings` - Booking list page
   - `/admin/invoices` - Invoice list page

3. **Client Portal**
   - `/app` - Client dashboard (basic)
   - Login redirects correctly

4. **API Integration**
   - Complete API client setup
   - Applications CRUD
   - Documents CRUD
   - Bookings CRUD
   - Billing endpoints
   - Communications endpoints
   - Content endpoints

### ⚠️ TODO - High Priority

#### Admin Portal
1. **Create Application Form** (`/admin/applications/new`)
2. **Client Detail Page** (`/admin/clients/[id]`)
3. **Booking Detail/Edit** (`/admin/bookings/[id]`)
4. **Invoice Detail/Edit** (`/admin/invoices/[id]`)
5. **Documents Management** (`/admin/documents`)
6. **Content Management UI** (`/admin/content`)
7. **Dashboard Stats** - Connect to real API endpoints
8. **User Management** - Add endpoints to backend

#### Client Portal
1. **Client Dashboard** - Real data integration
2. **My Applications** (`/app/applications`)
3. **Application Detail** (`/app/applications/[id]`)
4. **Documents Upload** (`/app/documents`)
5. **Book Consultation** (`/app/bookings/new`)
6. **My Bookings** (`/app/bookings`)
7. **Invoices & Payments** (`/app/billing`)
8. **Messages** (`/app/messages`)

---

## Implementation Patterns

### 1. List Pages Pattern

```typescript
'use client'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'next/link'
import { apiEndpoint } from '@/lib/api'

export default function ListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchItems = useCallback(async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {}
      const response = await apiEndpoint.list(params)
      setItems(response.data.results || response.data)
    } catch (error) {
      console.error('Failed to fetch items:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return (
    // List UI with filters, table, pagination
  )
}
```

### 2. Detail/Edit Page Pattern

```typescript
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function DetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [item, setItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchItem = useCallback(async () => {
    try {
      const response = await apiEndpoint.get(id)
      setItem(response.data)
      setFormData({ /* map fields */ })
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await apiEndpoint.update(id, formData)
      router.push('/back-to-list')
    } catch (error) {
      alert('Failed to update')
    } finally {
      setSaving(false)
    }
  }

  return (
    // Form with save/cancel buttons
  )
}
```

### 3. Create Form Pattern

```typescript
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiEndpoint.create(formData)
      router.push('/list-page')
    } catch (error) {
      alert('Failed to create')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Form UI
  )
}
```

---

## Required Backend Endpoints

### Missing Endpoints

1. **Users/Clients Management**
   ```python
   GET /api/admin/users/  # List all users
   GET /api/admin/users/{id}/  # Get user details
   PATCH /api/admin/users/{id}/  # Update user
   POST /api/admin/users/{id}/reset-password/  # Reset password
   ```

2. **Dashboard Stats**
   ```python
   GET /api/admin/dashboard/stats/  # Get KPI stats
   GET /api/admin/dashboard/charts/  # Get chart data
   ```

3. **Application Updates**
   ```python
   PATCH /api/applications/{id}/assign/  # Assign to consultant
   POST /api/applications/{id}/send-email/  # Send notification
   ```

4. **Client-Specific**
   ```python
   GET /api/app/me/dashboard/  # Client dashboard stats
   GET /api/app/me/applications/  # Client's applications
   GET /api/app/me/documents/  # Client's documents
   ```

---

## Component Library

### Reusable Components to Create

1. **StatusBadge** - Display status with color coding
2. **PriorityBadge** - Display priority
3. **FormInput** - Standardized input field
4. **FormSelect** - Standardized select
5. **FormTextarea** - Standardized textarea
6. **ConfirmDialog** - Confirmation modal
7. **LoadingSpinner** - Loading state
8. **DataTable** - Reusable table with sorting/filtering
9. **Pagination** - Page navigation
10. **StatCard** - Dashboard stat display

---

## Quick Implementation Checklist

### Backend (Priority)
- [ ] Add user management endpoints
- [ ] Add dashboard stats endpoints
- [ ] Add client dashboard endpoints
- [ ] Test all CRUD operations
- [ ] Add validation and error handling
- [ ] Add rate limiting to admin endpoints

### Admin Portal (Priority)
- [ ] Complete client detail page
- [ ] Add create application flow
- [ ] Add document management UI
- [ ] Connect dashboard stats to API
- [ ] Add user management UI
- [ ] Add booking detail/edit
- [ ] Add invoice detail/edit
- [ ] Add content management UI
- [ ] Add search functionality
- [ ] Add export functionality

### Client Portal (Priority)
- [ ] Connect dashboard to real data
- [ ] Build applications list page
- [ ] Build application detail page
- [ ] Build document upload/management
- [ ] Build booking creation flow
- [ ] Build bookings list page
- [ ] Build invoices/payments page
- [ ] Build messages page
- [ ] Add profile settings

### Shared
- [ ] Build reusable components
- [ ] Add error boundaries
- [ ] Add loading states everywhere
- [ ] Add success/error notifications
- [ ] Add confirmation dialogs
- [ ] Add file upload handling
- [ ] Add PDF viewer
- [ ] Add print functionality

---

## Testing Strategy

### Unit Tests
- API functions
- Utility functions
- Form validation

### Integration Tests
- Full CRUD workflows
- Authentication flows
- File upload/download
- Status transitions

### E2E Tests
- Login → Dashboard → Create → Edit → Delete
- Client booking flow
- Document upload flow
- Invoice payment flow

---

## Next Immediate Steps

1. **Start with client portal** - Users can interact immediately
2. **Build document upload** - Critical for applications
3. **Complete admin dashboard** - Staff need overview
4. **Add real-time updates** - Using WebSockets or polling
5. **Implement notifications** - Email and in-app
6. **Add analytics** - Track usage and performance

---

## Notes

- All forms should use `react-hook-form` for validation
- All API calls should have error handling
- All list pages should support pagination
- All detail pages should have loading states
- All actions should have confirmations when destructive
- Use consistent styling with Tailwind CSS
- Follow accessibility guidelines (ARIA labels, keyboard navigation)

---

**Last Updated**: Today
**Status**: Foundation Complete, Building Core Features

