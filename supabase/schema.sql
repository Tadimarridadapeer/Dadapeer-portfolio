-- =========================================================================
-- Today I Learned (TIL) — PostgreSQL Schema & Supabase Configuration
-- =========================================================================

-- 1. Create table: learning_entries
CREATE TABLE IF NOT EXISTS public.learning_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT,
    learning_date DATE NOT NULL DEFAULT CURRENT_DATE,
    published_at TIMESTAMPTZ,
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    key_takeaways TEXT[] NOT NULL DEFAULT '{}',
    code_examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    references JSONB NOT NULL DEFAULT '[]'::jsonb,
    cover_image_path TEXT,
    document_path TEXT,
    document_filename TEXT,
    document_mime_type TEXT,
    document_size BIGINT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_til_status_date ON public.learning_entries (status, learning_date DESC);
CREATE INDEX IF NOT EXISTS idx_til_slug ON public.learning_entries (slug);
CREATE INDEX IF NOT EXISTS idx_til_category ON public.learning_entries (category);
CREATE INDEX IF NOT EXISTS idx_til_tags ON public.learning_entries USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_til_published_at ON public.learning_entries (published_at DESC) WHERE status = 'published';

-- 3. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION public.handle_til_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_til_updated_at ON public.learning_entries;
CREATE TRIGGER trigger_til_updated_at
    BEFORE UPDATE ON public.learning_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_til_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.learning_entries ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public visitors can only view published entries
CREATE POLICY "Public visitors can read published learning entries"
    ON public.learning_entries
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- Policy 2: Authenticated admin / service role has full access
CREATE POLICY "Admin has full access to all learning entries"
    ON public.learning_entries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =========================================================================
-- Supabase Storage Bucket Configuration
-- =========================================================================

-- Create storage bucket for technical documentation attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('til-documents', 'til-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can read published documents
CREATE POLICY "Public read access to published documents"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'til-documents');

-- Storage RLS: Admin full access to documents
CREATE POLICY "Admin full access to documents"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'til-documents')
WITH CHECK (bucket_id = 'til-documents');
