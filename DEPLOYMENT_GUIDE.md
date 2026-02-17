# SADC Directory — Complete Deployment Guide (Mobile-Only)
## No computer needed. Everything works from your Android phone's browser.

---

## PART 1: CREATE YOUR SUPABASE DATABASE

### Step 1: Create a Supabase Account
1. Open your phone's browser (Chrome recommended)
2. Go to: **https://supabase.com**
3. Tap **"Start your project"**
4. Sign up using your Google account or email
5. Verify your email if required

### Step 2: Create a New Project
1. After logging in, tap **"New project"**
2. Choose your organisation (or create one)
3. Fill in:
   - **Name:** `sadc-directory`
   - **Database Password:** Create a strong password. **SAVE THIS PASSWORD SOMEWHERE SAFE.**
   - **Region:** Choose the closest region to Southern Africa (e.g., `eu-west-1` for Europe West, or `ap-southeast-1` for Asia Pacific)
4. Tap **"Create new project"**
5. Wait 1-2 minutes for the project to be created

### Step 3: Get Your API Keys
1. In your Supabase project, tap the settings icon (⚙️) or go to **Settings**
2. Tap **"API"** in the left menu
3. You will see:
   - **Project URL** — looks like `https://xxxxx.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`
   - **service_role** key — another long key (keep this SECRET)
4. **Copy and save all three values** — you will need them later

### Step 4: Run the Database Schema
1. In Supabase, tap **"SQL Editor"** in the left menu
2. Tap **"New query"**
3. Open this file on your phone: **`supabase/migrations/001_schema.sql`**
4. Copy the ENTIRE contents of that file
5. Paste it into the SQL Editor
6. Tap **"Run"** (the green button)
7. Wait for "Success" message

### Step 5: Run the RLS Security Policies
1. Tap **"New query"** again in SQL Editor
2. Open: **`supabase/migrations/002_rls.sql`**
3. Copy all contents and paste into SQL Editor
4. Tap **"Run"**
5. Wait for "Success"

### Step 6: Seed the Reference Data
1. Tap **"New query"** again
2. Open: **`supabase/seeds/001_reference_data.sql`**
3. Copy all contents and paste
4. Tap **"Run"**
5. This inserts all 16 SADC countries and 24 categories

### Step 7: Generate 10,000+ Listings
1. Tap **"New query"** again
2. Open: **`supabase/seeds/002_listings_seed.sql`**
3. Copy all contents and paste
4. Tap **"Run"**
5. **This may take 1-3 minutes** — do not close the browser
6. You will see a result table showing listing counts per country

### Step 8: Enable Email Authentication
1. Go to **Authentication** > **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Go to **Authentication** > **Settings**
4. Set **Site URL** to your Vercel URL (you'll update this after deploying)

---

## PART 2: CREATE YOUR GITHUB REPOSITORY

### Step 1: Create a GitHub Account
1. Go to: **https://github.com**
2. Tap **"Sign up"**
3. Create your account and verify your email

### Step 2: Create a New Repository
1. After logging into GitHub, tap the **"+"** icon (top right)
2. Tap **"New repository"**
3. Fill in:
   - **Repository name:** `sadc-directory`
   - **Description:** `SADC Business Directory - Southern Africa`
   - Set to **Public** (required for free Vercel hosting)
4. DO NOT tick "Add a README file" — leave all checkboxes empty
5. Tap **"Create repository"**
6. **COPY the repository URL** — it looks like `https://github.com/YOUR-USERNAME/sadc-directory`

### Step 3: Upload Files to GitHub

GitHub allows you to upload files from your phone. Here's the method:

#### Method A: Upload via GitHub Web Interface (Folder by folder)

1. In your new empty repository, tap **"uploading an existing file"** or **"Add file"** > **"Upload files"**
2. Upload files folder by folder. Start with the root files:
   - `package.json`
   - `next.config.ts`
   - `tailwind.config.ts`
   - `tsconfig.json`
   - `postcss.config.mjs`
   - `middleware.ts`
   - `.gitignore`
   - `vercel.json`
   - `DEPLOYMENT_GUIDE.md`
3. Commit each batch with a message like "Add root config files"
4. Create folders by clicking **"Add file"** > **"Create new file"** and typing the path like `src/app/page.tsx`
5. For each file in the repository, copy its content and paste it

#### Method B: Use GitHub.dev (Online VS Code — Easier!)

1. After creating your empty repository, change the URL from `github.com` to `github.dev`
   - Example: `https://github.dev/YOUR-USERNAME/sadc-directory`
2. This opens a web-based code editor (like VS Code in your browser)
3. You can create folders and files directly in the editor
4. Copy and paste each file's content
5. Use the Source Control icon (left panel) to commit and push all changes at once

**IMPORTANT:** Create all files exactly as shown in the project structure below.

---

## PART 3: CONNECT TO VERCEL AND DEPLOY

### Step 1: Create a Vercel Account
1. Go to: **https://vercel.com**
2. Tap **"Sign up"**
3. Sign up with GitHub (this is easiest — tap "Continue with GitHub")
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository
1. On the Vercel dashboard, tap **"Add New Project"**
2. Find and select your `sadc-directory` repository
3. Tap **"Import"**

### Step 3: Configure Environment Variables
**Before deploying**, you MUST add your Supabase credentials:

1. On the configuration screen, look for **"Environment Variables"**
2. Add each variable one by one:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role key |
| `NEXT_PUBLIC_APP_URL` | https://your-project.vercel.app (set AFTER first deploy) |

3. Tap **"Deploy"**
4. Wait 2-5 minutes for the build to complete

### Step 4: Get Your Live URL
1. After deployment, Vercel shows you your URL like: `https://sadc-directory-xxx.vercel.app`
2. Go back to Vercel **Settings** > **Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` to your actual Vercel URL
4. Go to **Deployments** and tap **"Redeploy"** to apply the change

### Step 5: Update Supabase Auth Settings
1. Go back to Supabase
2. Go to **Authentication** > **Settings**
3. Set **Site URL** to your Vercel URL: `https://your-project.vercel.app`
4. Under **Redirect URLs**, add: `https://your-project.vercel.app/**`
5. Tap **Save**

---

## PART 4: SET UP YOUR ADMIN ACCOUNT

### Step 1: Register Your Account
1. Visit your live website
2. Tap **"Get Started"** or go to `/auth/register`
3. Create your account with your email and a strong password
4. Check your email and verify your account

### Step 2: Promote Yourself to Admin
1. Go back to Supabase SQL Editor
2. Tap **"New query"**
3. Run this SQL (replace with YOUR email):

```sql
UPDATE profiles SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your-email@example.com'
);
```

4. Tap **"Run"**
5. You should see "1 row updated"

### Step 3: Access the Admin Panel
1. Go to your website
2. Sign in with your account
3. Tap your profile icon > **"Admin Panel"**
4. Or go directly to: `https://your-site.vercel.app/admin`

---

## PART 5: VERIFY EVERYTHING WORKS

### Checklist:
- [ ] Homepage loads with hero search
- [ ] Countries and categories are visible
- [ ] Featured listings appear
- [ ] Search works (try searching "Hotel")
- [ ] Country page works (tap a country flag)
- [ ] Category page works (tap a category)
- [ ] Register a user account
- [ ] Login works
- [ ] Submit a listing
- [ ] Admin panel accessible at `/admin`
- [ ] Admin can approve/reject listings
- [ ] Admin can mark listings as featured
- [ ] Reviews can be submitted and approved
- [ ] Map shows on listing detail pages
- [ ] Favorites work when logged in

---

## TROUBLESHOOTING

### Build fails on Vercel:
- Double-check all environment variables are set correctly
- Make sure `NEXT_PUBLIC_SUPABASE_URL` starts with `https://` (not `http://`)
- Check Vercel build logs for specific error messages

### "No listings showing" on homepage:
- Make sure you ran the seed SQL files
- Check the listings have `status = 'approved'` in Supabase Table Editor

### Login not working:
- Make sure you updated the Supabase Site URL to your Vercel URL
- Check your email for a verification link after registering

### Admin panel shows blank/redirects:
- Make sure you ran the UPDATE query to set your role to 'admin'
- Sign out and sign back in after updating the role

### Map not loading:
- The map uses OpenStreetMap which requires internet access. This is normal.

---

## HOW THE SYSTEM WORKS

### Architecture Overview:
```
User's Browser
     ↓
Vercel CDN (Next.js App)
     ↓
Supabase (Database + Auth + Storage)
```

### Key Concepts:
1. **Next.js App Router** — The frontend framework. Pages are in `src/app/`
2. **Supabase** — Handles database, user authentication, and Row Level Security
3. **Row Level Security (RLS)** — Database rules that control who can see/edit what
4. **Tailwind CSS** — Styling framework for the UI
5. **OpenStreetMap/Leaflet** — Free map service for showing location pins

### Data Flow:
- Public users → Can view approved listings only (enforced by RLS)
- Logged-in users → Can submit listings, save favorites, write reviews
- Admin users → Can approve/reject listings, manage everything

---

## MONETISATION FEATURES (Already Built In)

The `ad_slots` table is ready for:
1. **Featured Listings** — Businesses pay to be shown first (already implemented)
2. **Banner Ads** — The table supports country and category-targeted ads
3. **Sponsored Listings** — Highlighted with gold borders (featured flag)
4. **Premium Packages** — Verified badge for trusted businesses

To activate paid features, you would connect a payment provider like Paystack (popular in Africa) or Stripe to the existing listing submission flow.

---

## FUTURE EXPANSION

The project is structured to easily add:
- Marketplace features (direct booking, payments)
- Business claiming system (owners claim their listing)
- Analytics dashboard (views, clicks, conversions)
- WhatsApp Business API integration
- Multi-language support (French, Portuguese, Swahili)
- Mobile app (using React Native with same Supabase backend)

