# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Git installed locally

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/Antonyshane14/washtex.git

# Push to main branch
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository (Antonyshane14/washtex)
4. Vercel will auto-detect the settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"
6. Wait 2-3 minutes for deployment to complete
7. Your app will be live at: `https://washtex.vercel.app` (or similar)

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? washtex
# - Directory? ./
# - Build settings detected? Yes

# For production deployment
vercel --prod
```

## Step 3: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Environment Variables (if needed)

If you add environment variables later:

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `VITE_API_URL` (when you connect backend)
   - `VITE_APP_ENV`
3. Redeploy for changes to take effect

## Continuous Deployment

Every push to `main` branch will automatically deploy to Vercel!

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys!
```

## Deployment Settings

The project includes:
- ✅ `vercel.json` - Vercel configuration
- ✅ `vite.config.js` - Optimized build settings
- ✅ `.gitignore` - Proper file exclusions
- ✅ SPA routing support (all routes work)

## Troubleshooting

### Build fails?
```bash
# Test build locally first
npm run build
npm run preview
```

### Routes not working?
- `vercel.json` has rewrite rules to handle SPA routing
- All routes redirect to `index.html`

### Large bundle size?
- Code splitting configured in `vite.config.js`
- Chunks: react-vendor, antd-vendor, chart-vendor

## Performance Optimization

Already configured:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Compression
- ✅ Lazy loading

## Demo Credentials

Share with users:
- Username: `admin` (or any text)
- Password: `password`
- Select role from dropdown

## Post-Deployment

Your live URL: `https://washtex-[random].vercel.app`

Test all features:
- ✅ Login with different roles
- ✅ Admin dashboard
- ✅ Order tracking
- ✅ Store operations
- ✅ Factory processing
- ✅ Reports
- ✅ Settings

## Analytics (Optional)

Enable Vercel Analytics:
1. Go to Analytics tab in Vercel dashboard
2. Click "Enable"
3. Get insights on page views, performance, etc.

## Status

🟢 Ready for deployment!

Just run: `vercel` or deploy via GitHub import.
