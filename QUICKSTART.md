# Quick Start Guide

Get the Raylene Immigration Solutions platform running in 5 minutes!

## Option 1: Docker (Easiest)

```bash
# Clone the repository
git clone <repository-url>
cd rayleneimmigration.co.za

# Start everything
docker-compose up -d

# Wait for services to initialize (about 30 seconds)
# Then access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8000
# - Admin: http://localhost:8000/admin
```

**Default credentials:**
- Create superuser: `docker-compose exec backend python manage.py createsuperuser`

## Option 2: Local Development

### 1. Prerequisites Setup

**PostgreSQL:**
```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb raylene_db
```

**Redis:**
```bash
# macOS
brew install redis
brew services start redis
```

### 2. Backend Setup

```bash
cd apps/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Environment setup
export DATABASE_URL="postgresql://localhost/raylene_db"
export REDIS_URL="redis://localhost:6379/0"
export SECRET_KEY="dev-secret-key-change-in-production"

# Database setup
python manage.py makemigrations
python manage.py migrate

# Load initial data
python manage.py loaddata accounts/fixtures/initial_data.json
python manage.py loaddata applications/fixtures/initial_data.json
python manage.py loaddata documents/fixtures/initial_data.json

# Create admin user
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend running at: **http://localhost:8000**

### 3. Frontend Setup

```bash
# New terminal
cd apps/web

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend running at: **http://localhost:3000**

## First Steps

### 1. Create Your First Admin User

```bash
cd apps/backend
python manage.py createsuperuser
# Enter email, password when prompted
```

### 2. Access Admin Panel

Visit **http://localhost:8000/admin**

Login with your superuser credentials.

### 3. Create Application Types (Optional)

Initial data is loaded, but you can customize in Admin:
- Applications → Application Types

### 4. Explore API Documentation

Visit **http://localhost:8000/api/docs** for interactive Swagger UI.

### 5. Test User Registration

Visit **http://localhost:3000/register** and create a test client account.

## Common Commands

### Backend

```bash
cd apps/backend

# Run server
python manage.py runserver

# Run Celery worker
celery -A raylene worker --loglevel=info

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Shell
python manage.py shell

# Run tests
python manage.py test
```

### Frontend

```bash
cd apps/web

# Run dev server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint
npm run lint
```

## Troubleshooting

### Backend won't start

**Database connection error:**
```bash
# Check PostgreSQL is running
psql -l

# Create database if needed
createdb raylene_db
```

**Module not found:**
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend won't start

**Dependencies error:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**API connection error:**
- Verify backend is running on port 8000
- Check browser console for CORS errors
- Ensure `.env.local` has correct `NEXT_PUBLIC_API_URL`

### Docker issues

**Services won't start:**
```bash
# Check logs
docker-compose logs

# Rebuild
docker-compose down -v
docker-compose up --build
```

## Next Steps

1. ✅ **Customize branding** - Update logo, colors in Tailwind config
2. ✅ **Configure email** - Set up SMTP in `.env`
3. ✅ **Set up storage** - Configure S3 credentials
4. ✅ **Test workflows** - Create test applications, upload documents
5. ✅ **Explore features** - Try bookings, billing, messages

## Production Deployment

For production deployment, see:
- Environment variables setup
- Database migrations
- Static file collection
- SSL certificates
- Monitoring setup

Check `ARCHITECTURE.md` for detailed deployment guide.

## Getting Help

- **API Docs**: http://localhost:8000/api/docs
- **Admin Panel**: http://localhost:8000/admin
- **Django Shell**: `python manage.py shell`
- **Logs**: Check terminal output or Docker logs

## What's Next?

- [ ] Configure email notifications
- [ ] Set up payment providers (Stripe/Paystack)
- [ ] Configure WhatsApp/SMS
- [ ] Customize UI components
- [ ] Add more content/blog posts
- [ ] Create custom templates
- [ ] Set up monitoring (Sentry)

Happy coding! 🚀

