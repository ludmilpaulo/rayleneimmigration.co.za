# Raylene Immigration Solutions

Full-stack immigration management platform built with Next.js 14 and Django 5.

## 🎯 Overview

Professional immigration services platform for managing visa applications, client interactions, and business operations in South Africa.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Library**: shadcn/ui + Radix UI
- **State**: React Query (TanStack)
- **Forms**: react-hook-form + Zod
- **HTTP**: Axios with JWT refresh

### Backend
- **Framework**: Django 5 + DRF
- **Database**: PostgreSQL
- **Tasks**: Celery + Redis
- **Storage**: S3-compatible
- **Auth**: JWT (HttpOnly cookies)
- **Docs**: Swagger/OpenAPI

## 🏗️ Key Features

✅ **Complete backend API** with Django REST Framework  
✅ **Authentication & authorization** with JWT and roles  
✅ **Application management** with status tracking  
✅ **Document workflow** with upload and review  
✅ **Booking system** for consultations  
✅ **Billing & payments** infrastructure  
✅ **Notifications** system (Email/SMS/WhatsApp ready)  
✅ **Admin dashboard** with Django admin  
✅ **Modern frontend** with Next.js 14  
✅ **Responsive UI** with TailwindCSS  
✅ **API documentation** (Swagger/ReDoc)  
✅ **Audit logging** for compliance  

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Redis

### Setup

See **[SETUP.md](./SETUP.md)** for detailed installation instructions.

**Quick start:**
```bash
# Install dependencies
npm install
cd apps/backend && pip install -r requirements.txt && cd ../..
cd apps/web && npm install && cd ../..

# Or use Docker
docker-compose up -d
```

## 📁 Project Structure

```
rayleneimmigration.co.za/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # Pages & routes
│   │   └── lib/          # API client & utils
│   ├── backend/          # Django backend
│   │   ├── accounts/     # Users, roles, auth
│   │   ├── applications/ # App management
│   │   ├── documents/    # Document workflow
│   │   ├── bookings/     # Scheduling
│   │   ├── billing/      # Invoices & payments
│   │   ├── communications/ # Messages, notifications
│   │   ├── content/      # Blog
│   │   └── raylene/      # Settings
├── docker-compose.yml    # Dev environment
└── README.md
```

## 🗄️ Data Models

- **Users**: Custom auth with roles (Admin, Consultant, Client, etc.)
- **Applications**: Full lifecycle tracking
- **Documents**: Upload, review, approval workflow
- **Bookings**: Consultation scheduling
- **Invoices & Payments**: Billing infrastructure
- **Messages**: Client-staff communication
- **Notifications**: Multi-channel notifications
- **Audit Logs**: Compliance tracking

## 🔌 API Endpoints

- **Auth**: `/api/auth/` - Login, register, profile
- **Applications**: `/api/applications/` - CRUD + status updates
- **Documents**: `/api/documents/` - Upload & review
- **Bookings**: `/api/bookings/` - Scheduling
- **Billing**: `/api/billing/` - Invoices & payments
- **Comms**: `/api/communications/` - Messages & notifications
- **Content**: `/api/content/` - Blog posts
- **Docs**: `/api/docs/` - Swagger UI

## 🛡️ Security

- JWT authentication with refresh tokens
- Role-based access control
- Encrypted sensitive fields
- Comprehensive audit logging
- CORS & CSRF protection
- 2FA support (structure ready)

## 🌐 Workflows

**Application Flow**: Draft → Intake → Review → Docs → Submit → Processing → Decision

**Document Flow**: Upload → Review → Approved/Re-upload

**Booking Flow**: Select Slot → Confirm → Calendar Invite

**Payment Flow**: Invoice → Payment → Webhook → Receipt

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Installation & setup
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- API Docs: `http://localhost:8000/api/docs/`

## 🔧 Configuration

Environment variables required:
- Database (PostgreSQL)
- Redis
- Storage (S3-compatible)
- Email (SMTP/SES)
- Payments (Stripe, Paystack)
- Notifications (WhatsApp, SMS)

See `.env.example` in each app directory.

## 🧪 Testing

```bash
# Backend tests
cd apps/backend && python manage.py test

# Frontend tests (coming soon)
cd apps/web && npm run test
```

## 🚢 Deployment

Ready for production deployment with:
- Docker support
- Environment-based configuration
- Health checks
- Static file handling
- Database migrations

## 📋 Roadmap

- [ ] Complete i18n implementation (EN/PT)
- [ ] E2E tests with Playwright
- [ ] Payment webhook handlers
- [ ] WhatsApp integration
- [ ] OCR for documents
- [ ] Mobile app (React Native)
- [ ] AI document quality checks

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For setup issues or questions, refer to [SETUP.md](./SETUP.md) or check API documentation at `/api/docs/`.

