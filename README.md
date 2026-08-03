# Bar Mubiti — Vercel-Ready

A premium bar & grill website for Bar Mubiti in Kigali, Rwanda. Built for serverless deployment on Vercel.

## Deploy to Vercel (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Manual Deploy Steps

### 1. Create a Neon PostgreSQL Database
- Go to [neon.tech](https://neon.tech) and sign up (free tier)
- Create a new project
- Copy the connection string (looks like `postgresql://user:pass@host.neon.tech/db?sslmode=require`)
- Use the same URL for both `DATABASE_URL` and `DIRECT_URL`

### 2. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bar-mubiti.git
git push -u origin main
```

### 3. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import your GitHub repository
3. Set environment variables:
   - `DATABASE_URL` = your Neon connection string
   - `DIRECT_URL` = same as DATABASE_URL
   - `NEXTAUTH_SECRET` = generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` = your Vercel domain (e.g., `https://bar-mubiti.vercel.app`)
   - `ADMIN_EMAIL` = `admin@barmubiti.com`
   - `ADMIN_PASSWORD` = your secure password
4. Deploy

### 4. Seed the Database
After first deploy, run the seed script locally or via Vercel CLI:
```bash
# Locally (with DATABASE_URL pointing to Neon)
npx prisma db push
npm run db:seed
```

Or use Vercel CLI:
```bash
vercel --prod
vercel env pull .env
npx prisma db push
npm run db:seed
```

### 5. Login to Admin
- Visit `https://your-domain.vercel.app/admin/login`
- Email: your `ADMIN_EMAIL`
- Password: your `ADMIN_PASSWORD`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL pooled connection string |
| `DIRECT_URL` | Neon PostgreSQL direct connection string |
| `NEXTAUTH_URL` | Your deployed domain |
| `NEXTAUTH_SECRET` | Random 32+ character string |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

## Local Development

```bash
npm install

# Create .env from example
cp .env.example .env
# Fill in your Neon DATABASE_URL and DIRECT_URL

npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Features

### Public Site
- Animated hero with particle effects
- Full menu with categories
- Gallery with lightbox
- Reviews & testimonials
- Location with Google Maps link
- Contact form + WhatsApp integration
- Mobile-first responsive design

### Admin CMS
- Secure login
- Dashboard with stats
- Edit business info, hours, menu, gallery
- Manage reservations & messages
- All changes reflect instantly on the public site

## Tech Stack
- Next.js 14 App Router
- React 18 + TypeScript
- Prisma ORM + PostgreSQL (Neon)
- NextAuth.js
- Tailwind CSS + Framer Motion
- Base64 image uploads (serverless-friendly)

## Post-Deploy Checklist
- [ ] Change admin password
- [ ] Update business info in admin panel
- [ ] Upload real gallery images
- [ ] Add full menu with real prices
- [ ] Add real customer reviews
- [ ] Update social media links
- [ ] Embed real Google Maps
- [ ] Set custom domain (optional)
