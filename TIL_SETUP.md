# Today I Learned (TIL) — Setup & Architecture Guide

## 1. Overview
The **Today I Learned (TIL)** journal allows you to document technical concepts, upload architectural documents (PDF, Markdown, TXT, DOCX), and manage entries via a private admin portal (`/admin`).

Everything works **out-of-the-box locally** using a zero-dependency persistent JSON store and local file storage, with seamless support for **Supabase PostgreSQL & Storage** in production.

---

## 2. Environment Variables

Create or update `.env.local`:

```bash
# ==========================================
# Admin Portal Authentication
# ==========================================
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SESSION_SECRET=your_random_64_character_hmac_secret_key

# ==========================================
# Optional: Supabase Production Deployment
# ==========================================
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> **Default in Local Dev:** If `ADMIN_PASSWORD` is not set in `.env.local`, the default password is `admin123`.

---

## 3. URLs and Routing

| Route | Description | Visibility |
|---|---|---|
| `/learning` | Public TIL archive with search, calendar grid, category filters, and stats | Public |
| `/learning/[slug]` | Individual lesson view with takeaways, code, and document download | Public (Published only) |
| `/admin` | Private lesson management dashboard with stats, table, status toggle | Protected |
| `/admin/login` | Secure admin login | Private |
| `/admin/new` | Create new learning entry form with document upload | Protected |
| `/admin/edit/[id]` | Edit existing entry with document replacement/deletion | Protected |
| `/api/documents/[filename]` | Secure document stream & download (drafts protected) | Protected |

---

## 4. Supabase Database & Storage Deployment (Optional)

When deploying to Vercel and connecting Supabase:
1. Open your Supabase SQL Editor.
2. Execute the script in [`supabase/schema.sql`](./supabase/schema.sql).
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel project environment variables.
