// scripts/seed-supabase.mjs
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      envVars[key] = val;
    }
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || 'https://dscsmolfrfqxntofqpmu.supabase.co';
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is not set in .env.local');
  console.error('Please get it from: https://supabase.com/dashboard/project/dscsmolfrfqxntofqpmu/settings/api');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

async function seed() {
  console.log(`Connecting to Supabase at ${supabaseUrl}...`);

  const seedFile = path.resolve(process.cwd(), 'data', 'til-lessons.json');
  if (!fs.existsSync(seedFile)) {
    console.error('❌ Error: data/til-lessons.json not found');
    process.exit(1);
  }

  const raw = fs.readFileSync(seedFile, 'utf8');
  const lessons = JSON.parse(raw);

  console.log(`Found ${lessons.length} seed lessons to sync...`);

  for (const lesson of lessons) {
    const record = {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      summary: lesson.summary,
      content: lesson.content || '',
      learning_date: lesson.learningDate,
      published_at: lesson.publishedAt,
      category: lesson.category,
      tags: lesson.tags || [],
      key_takeaways: lesson.keyTakeaways || [],
      code_examples: lesson.codeExamples || [],
      references: lesson.references || [],
      cover_image_path: lesson.coverImagePath,
      document_path: lesson.documentPath,
      document_filename: lesson.documentFilename,
      document_mime_type: lesson.documentMimeType,
      document_size: lesson.documentSize,
      status: lesson.status,
      created_at: lesson.createdAt,
      updated_at: lesson.updatedAt,
    };

    const { data, error } = await supabase
      .from('learning_entries')
      .upsert(record, { onConflict: 'id' })
      .select();

    if (error) {
      console.error(`❌ Failed to upsert "${lesson.title}":`, error.message);
    } else {
      console.log(`✅ Upserted: "${lesson.title}" (${lesson.status})`);
    }
  }

  console.log('\n🎉 Supabase seeding complete!');
}

seed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
