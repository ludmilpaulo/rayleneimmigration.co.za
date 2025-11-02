# Production Configuration Guide

**Production URLs:**
- **Frontend**: https://www.rayleneimmigration.co.za/
- **Backend**: https://reylene.pythonanywhere.com/

---

## 🌐 Environment Variables

### Frontend (Next.js)

Create a `.env.production` file in `apps/web/`:

```bash
# Production API URL
NEXT_PUBLIC_API_URL=https://reylene.pythonanywhere.com
```

**For Local Development**, create `.env.local`:
```bash
# Local development API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (Django)

On PythonAnywhere, set these environment variables in your **Web App Settings** or via `.env` file:

```bash
# Django Settings
SECRET_KEY=your-production-secret-key-here-CHANGE-THIS
DEBUG=False
ALLOWED_HOSTS=reylene.pythonanywhere.com,www.rayleneimmigration.co.za,rayleneimmigration.co.za

# CORS Settings (allow frontend domain)
CORS_ALLOWED_ORIGINS=https://www.rayleneimmigration.co.za,https://rayleneimmigration.co.za
CSRF_TRUSTED_ORIGINS=https://www.rayleneimmigration.co.za,https://rayleneimmigration.co.za

# Database (for PythonAnywhere MySQL)
DATABASE_URL=mysql://username:password@hostname/database_name

# Or use SQLite for simplicity
USE_SQLITE=True

# Redis (optional, for Celery)
REDIS_URL=redis://localhost:6379/0

# Email Settings
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# S3 Storage (optional, for media files)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=your-bucket
AWS_S3_REGION_NAME=af-south-1
```

---

## 🚀 Deployment Checklist

### Frontend (Vercel/Netlify)

1. **Create `.env.production`** file with:
   ```
   NEXT_PUBLIC_API_URL=https://reylene.pythonanywhere.com
   ```

2. **Build the project**:
   ```bash
   cd apps/web
   npm run build
   ```

3. **Deploy** to Vercel or your hosting:
   ```bash
   vercel --prod
   ```

### Backend (PythonAnywhere)

1. **Upload your code** to PythonAnywhere

2. **Set up virtual environment**:
   ```bash
   mkvirtualenv raylene --python=/usr/bin/python3.11
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Load initial data**:
   ```bash
   python manage.py loaddata accounts/fixtures/initial_data.json
   python manage.py loaddata applications/fixtures/initial_data.json
   python manage.py loaddata documents/fixtures/initial_data.json
   ```

6. **Create superuser** (if needed):
   ```bash
   python manage.py createsuperuser
   ```

7. **Collect static files**:
   ```bash
   python manage.py collectstatic --noinput
   ```

8. **Configure Web App**:
   - Set **Source code** path: `/home/yourusername/path/to/rayleneimmigration`
   - Set **Working directory**: `/home/yourusername/path/to/rayleneimmigration/apps/backend`
   - Set **WSGI file**: `/home/yourusername/path/to/rayleneimmigration/apps/backend/raylene/wsgi.py`
   - Set **Virtualenv**: `/home/yourusername/.virtualenvs/raylene`

9. **Set environment variables** in Web App config or `.env` file

10. **Reload** your web app

---

## 🔒 Security Checklist

### Backend
- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Enable HTTPS on PythonAnywhere
- [ ] Configure proper CORS origins
- [ ] Use environment variables for sensitive data
- [ ] Enable database backups
- [ ] Set up monitoring/error tracking (Sentry)
- [ ] Regular security updates

### Frontend
- [ ] Build with production optimizations
- [ ] Enable HTTPS
- [ ] Verify security headers
- [ ] Test CSP (Content Security Policy)
- [ ] No API keys exposed in client-side code

---

## 🔗 URLs Configuration

### Frontend API Calls
The frontend is configured to call:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

**Set environment variable**:
```bash
NEXT_PUBLIC_API_URL=https://reylene.pythonanywhere.com
```

### Backend CORS Configuration
Already configured in `apps/backend/raylene/settings.py`:
- Allows: `https://www.rayleneimmigration.co.za`
- Allows: `https://rayleneimmigration.co.za`  
- Allows: `http://localhost:3000` (for local dev)

---

## 🧪 Testing Production Setup

### 1. Test Backend API
```bash
# Test public endpoints
curl https://reylene.pythonanywhere.com/api/content/pages/
curl https://reylene.pythonanywhere.com/api/applications/types/

# Test admin endpoint
curl https://reylene.pythonanywhere.com/admin/
```

### 2. Test Frontend
```bash
# Visit the site
https://www.rayleneimmigration.co.za/

# Check browser console for API calls
# Should see calls to: https://reylene.pythonanywhere.com/api/
```

### 3. Test Authentication
1. Go to https://www.rayleneimmigration.co.za/login
2. Login with credentials
3. Should redirect to `/admin` or `/app`
4. Check browser Network tab for API calls

---

## 📝 PythonAnywhere Specific

### Static Files
PythonAnywhere serves static files from `/static/` URL. Configure:

```python
STATIC_URL = '/static/'
STATIC_ROOT = '/home/yourusername/staticfiles'
```

Then in Web App settings, add a **Static files** mapping:
- URL: `/static/`
- Directory: `/home/yourusername/staticfiles/`

### Media Files
If storing media locally on PythonAnywhere:
- URL: `/media/`
- Directory: `/home/yourusername/media/`

**Recommendation**: Use S3/Cloudflare R2 for production media storage.

### MySQL Database
If using MySQL on PythonAnywhere:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'yourusername$raylene_db',
        'USER': 'yourusername',
        'PASSWORD': 'your-db-password',
        'HOST': 'yourusername.mysql.pythonanywhere-services.com',
    }
}
```

---

## 🛠️ Troubleshooting

### CORS Errors
If you see CORS errors in browser console:
1. Check `CORS_ALLOWED_ORIGINS` in Django settings
2. Verify domain is allowed (no trailing slash)
3. Check `CORS_ALLOW_CREDENTIALS = True`

### API Connection Issues
If frontend can't reach backend:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check backend is running: https://reylene.pythonanywhere.com/
3. Verify backend CORS allows frontend domain
4. Check browser console for errors

### 404 Errors
If pages show 404:
1. Verify all pages are built in Next.js
2. Check `npm run build` completed successfully
3. Deploy correct build to production

### Authentication Issues
If login doesn't work:
1. Verify backend has users in database
2. Check JWT settings match between frontend/backend
3. Verify cookies are being set
4. Check browser console for errors

---

## ✅ Deployment Verification

After deployment, verify:

- [ ] Frontend loads at https://www.rayleneimmigration.co.za/
- [ ] All pages work (no 404s)
- [ ] Language switcher works
- [ ] Can login as admin
- [ ] Can register new client
- [ ] Admin portal works
- [ ] Client portal works
- [ ] API calls succeed
- [ ] Django admin loads at https://reylene.pythonanywhere.com/admin/
- [ ] Swagger docs load at https://reylene.pythonanywhere.com/api/docs/

---

**Configuration Complete!** 🎉

Now push to GitHub and deploy!

