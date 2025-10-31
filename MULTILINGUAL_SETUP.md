# Multilingual Content Management System

## Overview

Raylene Immigration Solutions now supports **3 languages**:
- **English (en)** - Default
- **Portuguese (pt)**
- **French (fr)**

All content is managed through the **Django admin** and delivered via **REST API**.

---

## Architecture

### Backend (Django)

#### Models

1. **Page** - Represents a page on the website
   - `slug`: Unique identifier (e.g., 'home', 'about', 'contact')
   - `title`: Internal title for admin
   - `description`: Internal description
   - `is_active`: Enable/disable page

2. **PageContent** - Contains translated content for a page
   - `page`: ForeignKey to Page
   - `locale`: Language code (en, pt, fr)
   - `title`: Page title in the language
   - `subtitle`: Page subtitle
   - `meta_description`: SEO meta description
   - `meta_keywords`: SEO keywords (comma-separated)
   - `body`: Main content (supports HTML)
   - `extra_data`: JSON field for flexible content (hero sections, features, etc.)
   - `is_active`: Enable/disable this translation

### Frontend (Next.js)

#### Locale Detection

The system uses **cookies** to remember user's language preference:
- Cookie name: `locale`
- Values: `en`, `pt`, `fr`
- Expires: 1 year
- Auto-detected from browser's `Accept-Language` header on first visit

#### Middleware

`apps/web/middleware.ts` automatically:
- Detects locale from cookie
- Falls back to browser language
- Sets locale cookie if not present
- Adds `x-locale` header to requests

#### Language Switcher

Located in navbar:
- `apps/web/components/LanguageSwitcher.tsx`
- Sets cookie and reloads page
- Updates all content immediately

---

## Setup Instructions

### 1. Backend Migrations

Run migrations to create the new tables:

```bash
cd apps/backend
python manage.py makemigrations content
python manage.py migrate
```

### 2. Create Superuser (if not exists)

```bash
python manage.py createsuperuser
```

### 3. Access Django Admin

Navigate to: `http://localhost:8000/admin/`

Login with superuser credentials.

### 4. Create Pages and Content

1. Go to **Content > Pages**
2. Click **Add Page**
3. Enter:
   - Title: `Home Page`
   - Slug: `home`
   - Description: `Main landing page`
   - Is active: ✓

4. In the same form, scroll to **Page contents** inline
5. Add 3 entries (one for each language):

**English (en):**
- Title: `Expert Immigration Solutions for South Africa`
- Subtitle: `Navigate your visa journey with confidence`
- Meta description: `Professional immigration services...`
- Body: Your main content HTML
- Extra data: `{"hero": {"heading": "..."}, "features": [...]}`

**Portuguese (pt):**
- Title: `Soluções de Imigração Especializadas para a África do Sul`
- ... (Portuguese translations)

**French (fr):**
- Title: `Solutions d'Immigration Expertes pour l'Afrique du Sud`
- ... (French translations)

6. Click **Save**

### 5. Create More Pages

Repeat for all pages:
- `home` - Homepage
- `about` - About Us
- `contact` - Contact Us
- `services` - Services
- `consultation` - Booking page
- `privacy` - Privacy Policy
- `terms` - Terms & Conditions

For service pages, create individual pages:
- `services/study-visa`
- `services/work-visa`
- `services/permanent-residence`

---

## API Usage

### Get Page Content

```typescript
import { contentApi } from '@/lib/api'

// Get page content for current locale
const response = await contentApi.page('home', locale)
const content = response.data

// Access content
const { title, subtitle, body, extra_data } = content.content
```

### Example: Server Component

```typescript
import { getLocale } from '@/lib/i18n-server'
import { contentApi } from '@/lib/api'

export default async function HomePage() {
  const locale = await getLocale()
  const response = await contentApi.page('home', locale)
  const { content } = response.data
  
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  )
}
```

### Example: Client Component

```typescript
'use client'

import { getLocaleClient } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { contentApi } from '@/lib/api'

export default function HomePage() {
  const [content, setContent] = useState(null)
  const locale = getLocaleClient()
  
  useEffect(() => {
    contentApi.page('home', locale).then(res => {
      setContent(res.data.content)
    })
  }, [locale])
  
  if (!content) return <div>Loading...</div>
  
  return (
    <div>
      <h1>{content.title}</h1>
      {/* ... */}
    </div>
  )
}
```

---

## Translation Files (Fallback)

Located in `apps/web/messages/`:
- `en.json` - English translations for UI elements
- `pt.json` - Portuguese translations for UI elements
- `fr.json` - French translations for UI elements

These are used for:
- Navigation labels
- Button text
- Form labels
- Status messages
- Admin interface

**Not used for page content** (which comes from the backend).

---

## Content Management Best Practices

### 1. SEO Optimization

Always fill out:
- `meta_description` - 150-160 characters
- `meta_keywords` - 5-10 relevant keywords
- `title` - Unique, descriptive, 50-60 characters

### 2. HTML Content

Use the `body` field for HTML:
```html
<h2>Section Title</h2>
<p>Paragraph text</p>
<ul>
  <li>Bullet point</li>
</ul>
```

### 3. Flexible Content

Use `extra_data` for structured content:

```json
{
  "hero": {
    "heading": "Welcome",
    "subheading": "Your journey starts here",
    "cta": "Get Started"
  },
  "features": [
    {"title": "Fast Processing", "icon": "⚡"},
    {"title": "Expert Team", "icon": "👥"}
  ],
  "testimonials": [
    {"name": "John Doe", "quote": "Great service!"}
  ]
}
```

### 4. Fallback Strategy

If a translation is missing:
- Falls back to English
- Shows empty content with error message (in production, log this)

---

## Migration Strategy

For existing pages to migrate to this system:

1. Export current hardcoded content from pages
2. Create Page records in admin
3. Create PageContent for English
4. Add Portuguese and French translations
5. Update frontend pages to fetch from API
6. Test all languages
7. Deploy

---

## Testing

### Local Testing

```bash
# Start backend
cd apps/backend
python manage.py runserver

# Start frontend
cd apps/web
npm run dev

# Test URLs
http://localhost:3000/ # English
# Change language to Portuguese or French via navbar
# Reload page
```

### Verify Locale

Open browser DevTools > Application > Cookies
- Check `locale` cookie value

### API Testing

```bash
# Get English content
curl http://localhost:8000/api/content/pages/home/?locale=en

# Get Portuguese content
curl http://localhost:8000/api/content/pages/home/?locale=pt

# Get French content
curl http://localhost:8000/api/content/pages/home/?locale=fr
```

---

## Troubleshooting

### Content not updating

1. Check Django admin: Is content active?
2. Clear browser cache
3. Check API response in Network tab
4. Verify locale cookie

### Wrong language showing

1. Check cookie value
2. Check middleware logs
3. Verify `Accept-Language` header

### Build errors

1. Check TypeScript errors
2. Verify all imports
3. Run `npm run build` locally
4. Check `middleware.ts` syntax

---

## Next Steps

1. ✅ Infrastructure complete
2. ⏳ Run backend migrations
3. ⏳ Add initial content via Django admin
4. ⏳ Update existing pages to fetch from API
5. ⏳ Add more page templates
6. ⏳ Implement content caching
7. ⏳ Add analytics per language

---

## Support

For issues or questions:
- Check `ARCHITECTURE.md` for system overview
- Review `README.md` for setup instructions
- Contact: info@rayleneimmigration.co.za

