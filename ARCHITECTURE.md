# Architecture Overview

## System Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Query (TanStack Query)
- **Forms**: react-hook-form + Zod validation
- **HTTP Client**: Axios with interceptors for JWT refresh
- **i18n**: next-intl (structure ready, implementation pending)

### Backend (Django 5)
- **Framework**: Django 5 + Django REST Framework
- **Language**: Python 3.11+
- **Database**: PostgreSQL
- **ORM**: Django ORM
- **Authentication**: JWT (Simple JWT) with HttpOnly cookies
- **Task Queue**: Celery + Redis (configured)
- **Storage**: S3-compatible (AWS S3, Cloudflare R2)
- **Documentation**: drf-spectacular (Swagger/OpenAPI)

## Project Structure

```
rayleneimmigration.co.za/
├── apps/
│   ├── backend/              # Django backend
│   │   ├── accounts/         # User, roles, profiles, audit
│   │   ├── applications/     # Application management
│   │   ├── documents/        # Document uploads & review
│   │   ├── bookings/         # Consultation scheduling
│   │   ├── billing/          # Invoices & payments
│   │   ├── communications/   # Messages, notifications, templates
│   │   ├── content/          # Blog posts
│   │   └── raylene/          # Main project settings
│   └── web/                  # Next.js frontend
│       ├── app/              # App Router pages
│       ├── lib/              # Utilities, API client
│       └── components/       # React components (to be built)
├── docker-compose.yml        # Development environment
├── package.json              # Root package.json
└── README.md
```

## Data Models

### Core Entities

**User & Authentication**
- `User`: Custom user model with email authentication
- `Role`: ADMIN, CONSULTANT, FINANCE, SUPPORT, CLIENT
- `UserRole`: Many-to-many relationship
- `ClientProfile`: Client-specific information
- `StaffProfile`: Staff-specific information
- `AuditLog`: Comprehensive audit trail

**Applications**
- `ApplicationType`: Visa/service definitions
- `Application`: Main application entity with status tracking
- `StatusHistory`: Complete status change history
- `Task`: Application-related tasks

**Documents**
- `DocumentType`: Required document definitions
- `Document`: Uploaded documents with review workflow

**Scheduling & Billing**
- `AvailabilitySlot`: Staff availability
- `Booking`: Consultation bookings
- `Invoice`: Billing invoices
- `Payment`: Payment records

**Communications**
- `Message`: Client-staff messaging
- `Notification`: Email/SMS/WhatsApp notifications
- `Template`: Email/letter templates

**Content**
- `BlogPost`: Blog articles

## API Endpoints

### Authentication (`/api/auth/`)
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - Login & JWT issue
- `POST /api/auth/refresh/` - Refresh token
- `GET /api/me/` - Current user profile
- `PATCH /api/me/` - Update profile
- `POST /api/me/change-password/` - Change password

### Applications (`/api/applications/`)
- `GET /api/applications/` - List (filtered by role)
- `POST /api/applications/` - Create
- `GET /api/applications/{id}/` - Detail
- `PATCH /api/applications/{id}/` - Update
- `PATCH /api/applications/{id}/update_status/` - Status change
- `GET /api/applications/types/` - Application types

### Documents (`/api/documents/`)
- `GET /api/documents/` - List
- `POST /api/documents/` - Create
- `GET /api/documents/{id}/` - Detail
- `PATCH /api/documents/{id}/review/` - Review document
- `POST /api/documents/uploads/presign/` - Pre-signed S3 URL
- `GET /api/documents/types/` - Document types

### Bookings (`/api/bookings/`)
- `GET /api/bookings/` - List
- `POST /api/bookings/` - Create
- `GET /api/bookings/availability/` - Available slots

### Billing (`/api/billing/`)
- `GET /api/billing/invoices/` - List invoices
- `GET /api/billing/payments/` - List payments

### Communications (`/api/communications/`)
- `GET /api/communications/messages/` - List messages
- `POST /api/communications/messages/` - Send message
- `GET /api/communications/notifications/` - List notifications

### Content (`/api/content/`)
- `GET /api/content/blog/` - List blog posts
- `GET /api/content/blog/{slug}/` - Blog post detail

## Security Features

1. **Authentication**
   - JWT tokens in HttpOnly cookies
   - Automatic token refresh
   - 2FA support (TOTP, structure ready)

2. **Authorization**
   - Role-based access control
   - Permission checks at API level
   - Client data isolation

3. **Data Protection**
   - Encrypted fields for sensitive PII (fernnet-fields)
   - Audit logging for all admin actions
   - SSL/TLS in production
   - CORS configuration

4. **Security Practices**
   - SQL injection protection (Django ORM)
   - XSS protection (React)
   - CSRF protection
   - Rate limiting (configured)

## Workflow

### Application Lifecycle

1. **Intake**
   - Client selects service
   - Fills profile
   - Creates application (DRAFT)

2. **Document Collection**
   - Client uploads documents
   - Staff reviews
   - Status: RECEIVED → REVIEWING → APPROVED/NEEDS_REUPLOAD

3. **Submission**
   - Application moves to READY_TO_SUBMIT
   - Final review
   - Status: SUBMITTED

4. **Processing**
   - DHA_PROCESSING
   - ADDITIONAL_INFO_REQUESTED (if needed)
   - Final status: APPROVED/REJECTED

### Notification Flow

All major events trigger notifications:
- Status changes
- Document requests
- Booking confirmations
- Invoice issuance
- Payment receipts

Notifications can be sent via:
- Email (required)
- SMS (optional)
- WhatsApp (optional)
- In-app (future)

## Deployment Considerations

### Requirements
- PostgreSQL database
- Redis for Celery
- S3-compatible storage
- SMTP server
- Payment provider accounts

### Environment Variables
See backend `.env.example` for required variables.

### Scaling
- Horizontal scaling: Multiple Django instances behind load balancer
- Database: PostgreSQL read replicas
- Cache: Redis cluster
- Storage: S3 CDN

## Development vs Production

**Development**
- SQLite/PostgreSQL local instance
- File-based document storage
- Console email backend
- Debug toolbar enabled

**Production**
- PostgreSQL with replication
- S3 storage with CDN
- SMTP/SES email
- Debug disabled
- SSL certificates
- Monitoring (Sentry)

## Integration Points

1. **Payment Providers**
   - Stripe (global)
   - Paystack (Africa)
   - SnapScan (SA)
   - Webhook handlers for reconciliation

2. **Communication**
   - Meta Cloud API (WhatsApp)
   - Twilio/Hubtel (SMS)
   - SMTP/Amazon SES (Email)

3. **Storage**
   - AWS S3
   - Cloudflare R2
   - MinIO (local dev)

4. **Monitoring**
   - Sentry (error tracking)
   - Healthchecks.io (uptime monitoring)
   - PostgreSQL slow query logs

## Future Enhancements

- OCR for automatic document parsing
- e-Signature integration (DocuSign)
- AI-powered document quality checks
- Multi-tenant support for agencies
- Mobile app (React Native)
- WhatsApp Business API integration
- Live chat support
- Video consultation booking

