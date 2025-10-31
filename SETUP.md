# Setup Instructions

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 14+
- Redis (for Celery tasks)

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd apps/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Load initial data**
   ```bash
   python manage.py loaddata accounts/fixtures/initial_data.json
   python manage.py loaddata applications/fixtures/initial_data.json
   python manage.py loaddata documents/fixtures/initial_data.json
   ```

8. **Run development server**
   ```bash
   python manage.py runserver
   ```

The backend will be available at http://localhost:8000

## Frontend Setup

1. **Navigate to web directory**
   ```bash
   cd apps/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000

## Docker Setup (Alternative)

From project root:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis on port 6379
- Django backend on port 8000
- Next.js frontend on port 3000

## Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE raylene_db;
CREATE USER raylene WITH PASSWORD 'raylene_dev_password';
GRANT ALL PRIVILEGES ON DATABASE raylene_db TO raylene;
```

Update `.env` with your database credentials.

## Testing

### Backend Tests
```bash
cd apps/backend
python manage.py test
```

### Frontend Tests
```bash
cd apps/web
npm run test
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/

## Admin Panel

Access the Django admin at http://localhost:8000/admin/

Login with the superuser credentials created during setup.

## Next Steps

1. Configure email/SMTP for notifications
2. Set up S3-compatible storage for documents
3. Configure payment providers (Stripe, Paystack)
4. Set up WhatsApp/SMS services
5. Deploy to production

## Troubleshooting

### Backend Issues

**Module not found errors**
```bash
pip install -r requirements.txt
```

**Database connection errors**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists and user has permissions

**Migration errors**
```bash
python manage.py migrate --run-syncdb
```

### Frontend Issues

**Module not found errors**
```bash
cd apps/web
rm -rf node_modules package-lock.json
npm install
```

**API connection errors**
- Verify backend is running
- Check NEXT_PUBLIC_API_URL in .env.local
- Ensure CORS is configured correctly

## Development Tips

1. Use the Django admin for initial data entry
2. Test API endpoints using Swagger UI
3. Check browser console for frontend errors
4. Monitor Django logs for backend errors
5. Use PostgreSQL query logs for database debugging

## Production Deployment

See `DEPLOYMENT.md` for production deployment instructions.

