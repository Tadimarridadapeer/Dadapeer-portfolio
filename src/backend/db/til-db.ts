import fs from "fs";
import path from "path";
import crypto from "crypto";
import { 
  LearningEntry, 
  CreateLessonInput, 
  UpdateLessonInput, 
  LearningStats, 
  LessonStatus 
} from "../types/til-types";
import { deleteDocument } from "../storage/document-storage";
import { getSupabaseAdmin, getSupabaseClient } from "../supabase/supabase-client";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "til-lessons.json");

// Genuine seed lessons covering real AI Product Engineer & backend topics
const INITIAL_SEEDED_LESSONS: LearningEntry[] = [
  {
    id: "lesson-001-race-conditions",
    title: "Preventing Race Conditions with Optimistic Locking vs SELECT FOR UPDATE in PostgreSQL",
    slug: "preventing-race-conditions-optimistic-locking-postgres",
    summary: "A deep-dive into concurrency anomalies in high-throughput applications, comparing database row-level locking (pessimistic) with version-based optimistic concurrency control.",
    content: `## The Core Concurrency Problem

When multiple concurrent requests attempt to read, modify, and write the same database record simultaneously, naive application logic introduces **race conditions** and lost updates.

Consider an inventory or balance deduction query:
1. Process A reads balance = $100.
2. Process B reads balance = $100.
3. Process A deducts $40 and writes balance = $60.
4. Process B deducts $50 and writes balance = $50.

The customer deducted $90 total, but the final record reflects $50 instead of $10.

---

## Solution 1: Pessimistic Locking with SELECT ... FOR UPDATE

In PostgreSQL, \`SELECT ... FOR UPDATE\` locks the selected rows against concurrent modifications until the active transaction completes:

\`\`\`sql
BEGIN;
-- Locks this row specifically
SELECT id, balance 
FROM accounts 
WHERE id = $1 
FOR UPDATE;

-- Application checks if balance >= amount
UPDATE accounts 
SET balance = balance - $2, updated_at = NOW() 
WHERE id = $1;

COMMIT;
\`\`\`

### When to use Pessimistic:
- High conflict frequency where retries would waste resources.
- Financial transactions with strict zero-tolerance for collision.

---

## Solution 2: Optimistic Concurrency Control (OCC)

Optimistic locking avoids locking database rows by maintaining an integer \`version\` column:

\`\`\`sql
-- Step 1: Read current state
SELECT id, balance, version FROM accounts WHERE id = $1;

-- Step 2: Atomic update conditional on version
UPDATE accounts 
SET balance = balance - $amount, version = version + 1 
WHERE id = $1 AND version = $current_version;
\`\`\`

If \`rowCount === 0\`, another transaction updated the row in between. The application catches this and retries or alerts the user.

### When to use Optimistic:
- Low-to-moderate contention.
- Read-heavy workloads where keeping locks would degrade database throughput.`,
    learning_date: "2026-10-18",
    published_at: "2026-10-18T10:30:00.000Z",
    category: "Backend Engineering",
    tags: ["PostgreSQL", "Concurrency", "Database Architecture", "SQL"],
    key_takeaways: [
      "Pessimistic locking guarantees strict serial ordering but holds row locks across network roundtrips.",
      "Optimistic locking requires zero locks during reads and detects conflicts atomically using version checks.",
      "Always combine OCC with an exponential backoff retry loop in the application layer.",
      "Never trust client-side balances: always execute deduction checks within the atomic update statement."
    ],
    code_examples: [
      {
        language: "typescript",
        caption: "Atomic deduction query with conditional safety guard",
        code: `// Safe atomic balance deduction without holding long locks
export async function deductBalance(userId: string, amount: number) {
  const result = await db.query(
    \`UPDATE accounts 
     SET balance = balance - $1, version = version + 1 
     WHERE id = $2 AND balance >= $1
     RETURNING balance, version\`,
    [amount, userId]
  );

  if (result.rowCount === 0) {
    throw new InsufficientFundsOrConcurrentConflictError();
  }
  return result.rows[0];
}`
      }
    ],
    references: [
      {
        title: "PostgreSQL Explicit Locking Documentation",
        url: "https://www.postgresql.org/docs/current/explicit-locking.html"
      },
      {
        title: "Martin Fowler: Optimistic Offline Lock Pattern",
        url: "https://martinfowler.com/eaaCatalog/optimisticOfflineLock.html"
      }
    ],
    status: "published",
    created_at: "2026-10-18T10:30:00.000Z",
    updated_at: "2026-10-18T10:30:00.000Z"
  },
  {
    id: "lesson-002-postgres-indexing",
    title: "PostgreSQL Indexing: Choosing Between B-Tree, GIN, and BRIN for Scale",
    slug: "postgresql-indexing-btree-gin-brin-strategies",
    summary: "Practical guide to database index types, internal data structures, and when to use B-Tree for equality/ranges, GIN for JSONB and full-text search, and BRIN for massive time-series tables.",
    content: `## Why Default B-Tree Indexes Aren't Always Enough

While the standard **B-Tree** index covers 90% of relational queries (equality, ranges, sorting), modern AI and cloud platforms deal with unstructured JSONB, vector embeddings, and multi-gigabyte append-only audit logs.

Understanding the internal tradeoffs between index algorithms prevents bloated indexes and unneeded memory pressure.

---

## 1. B-Tree (Balanced Tree)
- **Best for:** Unique keys, IDs, timestamps, numeric ranges (\`<, <=, =, >=, BETWEEN\`), and exact text equality.
- **Complexity:** O(log N) lookup, insertion, and deletion.
- **Rule of thumb:** Create multi-column B-Tree indexes matching your \`WHERE\` and \`ORDER BY\` column order (leftmost prefix rule).

\`\`\`sql
CREATE INDEX idx_users_active_created 
ON users (is_active, created_at DESC) 
WHERE deleted_at IS NULL; -- Partial index saves disk space!
\`\`\`

---

## 2. GIN (Generalized Inverted Index)
- **Best for:** JSONB documents, arrays, full-text search tokens, and tags.
- Instead of mapping rows to values, GIN maps **values (keys/tokens) to matching row IDs**.
- **Performance Tradeoff:** Slower on write/update due to multiple inverted entries, but blazingly fast on containment queries (\`@>, ?\`).

\`\`\`sql
-- Accelerate JSONB payload queries
CREATE INDEX idx_events_payload_gin 
ON audit_events USING gin (payload jsonb_path_ops);

-- Query that utilizes this index:
SELECT * FROM audit_events 
WHERE payload @> '{"action": "checkout", "status": "completed"}';
\`\`\`

---

## 3. BRIN (Block Range Index)
- **Best for:** Enormous append-only tables (10M+ rows) where rows are physically ordered on disk by timestamp or sequential ID.
- **How it works:** Instead of indexing every single row, BRIN stores the min and max value for a block of disk pages (default: 128 pages = 1MB).
- **Disk size:** Often **1/1000th** the size of a B-Tree index (e.g. 50 KB instead of 800 MB!).`,
    learning_date: "2026-10-21",
    published_at: "2026-10-21T14:15:00.000Z",
    category: "Database & Storage",
    tags: ["PostgreSQL", "Database Indexing", "Performance", "JSONB", "Query Optimization"],
    key_takeaways: [
      "Use partial indexes with WHERE clauses to drastically reduce index size and write overhead.",
      "GIN with jsonb_path_ops is up to 3x smaller than default GIN when only testing JSON containment (@>).",
      "BRIN indexes are ideal for append-only logs, metrics, and event stores with natural chronological correlation.",
      "Always inspect EXPLAIN (ANALYZE, BUFFERS) to verify index scans vs heap reads before optimizing."
    ],
    code_examples: [
      {
        language: "sql",
        caption: "Benchmarking query plan using EXPLAIN ANALYZE",
        code: `EXPLAIN (ANALYZE, BUFFERS, COSTS OFF)
SELECT id, user_id, payload->>'action'
FROM user_logs
WHERE payload @> '{"status": "error"}'
ORDER BY created_at DESC
LIMIT 50;`
      }
    ],
    references: [
      {
        title: "The Internals of PostgreSQL: Index Types",
        url: "https://www.interdb.jp/pg/pgsql01.html"
      },
      {
        title: "Use The Index, Luke! - Guide to Database Performance",
        url: "https://use-the-index-luke.com/"
      }
    ],
    status: "published",
    created_at: "2026-10-21T14:15:00.000Z",
    updated_at: "2026-10-21T14:15:00.000Z"
  },
  {
    id: "lesson-003-agentic-loop",
    title: "Designing Reliable AI Agent Architectures: State Machines, Tool Calling & Cycle Prevention",
    slug: "designing-reliable-ai-agent-architectures-state-machines",
    summary: "Architecting resilient autonomous AI agents using finite state machines, structured schema validation with Zod, and deterministic loop limiters to avoid infinite hallucination traps.",
    content: `## Beyond Naive Prompt Chaining

Building production-ready AI agents requires moving beyond raw OpenAI API loops to **deterministic state graphs**. Unbounded agent loops inevitably encounter:
1. Circular tool calls (calling the same search query infinitely).
2. Malformed parameters crashing JSON parsers.
3. Context window exhaustion.

---

## Core Architecture Pattern: Explicit State Graph

An agent is fundamentally a state machine:
- **State:** Stores current message history, intermediate tool results, execution depth counter, and pending user confirmation.
- **Node:** A discrete step (e.g., \`PlannerNode\`, \`ToolExecutorNode\`, \`EvaluatorNode\`).
- **Edge:** Conditional transition logic based on strict schema output.

\`\`\`
       [ User Request ]
              │
              ▼
       ┌──────────────┐
       │ Planner Node │
       └──────┬───────┘
              │ Tool call detected?
       ┌──────┴──────┐
       ▼             ▼
   [ Yes ]        [ No ] ───► [ Return Response ]
       │
       ▼
 ┌──────────────┐
 │ Execute Tool │
 └──────┬───────┘
        │ Increment loop counter (max: 6)
        ▼
 ┌──────────────┐
 │ Evaluate Ans │
 └──────────────┘
\`\`\`

---

## 3 Essential Safeguards:
1. **Deterministic Depth Guard:** Every execution state carries a \`stepCount\`. If \`stepCount >= MAX_STEPS\`, immediately break the loop and trigger graceful human fallback.
2. **Strict Tool Schemas:** Never accept raw unstructured tool inputs. Use JSON Schema or Zod with strict runtime validation.
3. **Idempotency Keys:** For tools that execute state mutations (API writes, database updates, emails), compute an idempotency hash of \`(tool_name, arguments_json)\` to guarantee that accidental retries never produce duplicate side effects.`,
    learning_date: "2026-10-24",
    published_at: "2026-10-24T18:00:00.000Z",
    category: "AI & LLMs",
    tags: ["AI Agents", "LLMs", "System Design", "State Machines", "Zod", "TypeScript"],
    key_takeaways: [
      "Treat AI tool invocation as an untrusted client call requiring strict schema validation.",
      "Hardcode circuit breakers and maximum iteration counts to protect against recursive agent loops.",
      "Always isolate read-only tools from side-effect mutations requiring human approval.",
      "Persist execution states to durable storage so long-running agent workflows can resume after server restarts."
    ],
    code_examples: [
      {
        language: "typescript",
        caption: "Deterministic Agent Loop Guard with Idempotency",
        code: `interface AgentState {
  step: number;
  maxSteps: number;
  seenToolCalls: Set<string>;
}

export function assertSafeToolExecution(
  state: AgentState, 
  toolName: string, 
  args: Record<string, unknown>
): void {
  if (state.step >= state.maxSteps) {
    throw new Error(\`Agent exceeded maximum safety step limit of \${state.maxSteps}\`);
  }

  const callSignature = \`\${toolName}:\${JSON.stringify(args)}\`;
  if (state.seenToolCalls.has(callSignature)) {
    throw new Error(\`Duplicate recursive tool call detected for \${toolName}\`);
  }

  state.seenToolCalls.add(callSignature);
  state.step += 1;
}`
      }
    ],
    references: [
      {
        title: "Anthropic: Building Effective Agents",
        url: "https://www.anthropic.com/research/building-effective-agents"
      },
      {
        title: "LangGraph Architecture & Multi-Agent Design",
        url: "https://langchain-ai.github.io/langgraph/"
      }
    ],
    status: "published",
    created_at: "2026-10-24T18:00:00.000Z",
    updated_at: "2026-10-24T18:00:00.000Z"
  }
];

function ensureDbFileExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_SEEDED_LESSONS, null, 2), "utf8");
  }
}

async function readAllEntries(): Promise<LearningEntry[]> {
  ensureDbFileExists();
  try {
    const raw = await fs.promises.readFile(DB_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed reading TIL database:", err);
    return [];
  }
}

async function writeAllEntries(entries: LearningEntry[]): Promise<void> {
  ensureDbFileExists();
  const tempPath = `${DB_FILE}.${Date.now()}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.promises.writeFile(tempPath, JSON.stringify(entries, null, 2), "utf8");
  await fs.promises.rename(tempPath, DB_FILE);
}

/**
 * Generate a clean URL-friendly slug and ensure uniqueness
 */
export async function generateUniqueSlug(title: string, existingId?: string): Promise<string> {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 75);

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      let slug = base || "lesson";
      let counter = 1;
      let exists = true;
      while (exists) {
        let q = supabase.from("learning_entries").select("id").eq("slug", slug);
        if (existingId) q = q.neq("id", existingId);
        const { data } = await q;
        if (!data || data.length === 0) {
          return slug;
        }
        slug = `${base}-${counter}`;
        counter++;
      }
    } catch (e) {
      // Fallback to local unique check
    }
  }

  const entries = await readAllEntries();
  let slug = base || "lesson";
  let counter = 1;

  while (entries.some((e) => e.slug === slug && e.id !== existingId)) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}

export interface GetLessonsFilter {
  status?: LessonStatus | "all";
  category?: string;
  tag?: string;
  search?: string;
  sort?: "newest" | "oldest";
  limit?: number;
  offset?: number;
}

/**
 * Fetch lessons from Supabase (or fallback local database) with filtering and search
 */
export async function getLessons(options: GetLessonsFilter = {}): Promise<{ lessons: LearningEntry[]; total: number }> {
  const {
    status = "published",
    category,
    tag,
    search,
    sort = "newest",
    limit = 50,
    offset = 0,
  } = options;

  // 1. Try Supabase Postgres first if configured
  const supabase = getSupabaseAdmin() || getSupabaseClient();
  if (supabase) {
    try {
      let query = supabase.from("learning_entries").select("*", { count: "exact" });

      if (status !== "all") {
        query = query.eq("status", status);
      }
      if (category && category !== "All") {
        query = query.ilike("category", category);
      }
      if (tag) {
        query = query.contains("tags", [tag]);
      }
      if (search && search.trim()) {
        const q = search.trim();
        query = query.or(`title.ilike.%${q}%,summary.ilike.%${q}%,content.ilike.%${q}%`);
      }

      query = query.order("learning_date", { ascending: sort === "oldest" });
      query = query.range(offset, offset + limit - 1);

      const { data, count, error } = await query;
      if (!error && data && data.length > 0) {
        return { lessons: data as LearningEntry[], total: count ?? data.length };
      }
    } catch (err) {
      console.warn("Supabase query fallback to local DB:", err);
    }
  }

  // 2. Local database fallback
  let list = await readAllEntries();

  if (status !== "all") {
    list = list.filter((e) => e.status === status);
  }

  if (category && category !== "All") {
    list = list.filter((e) => e.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    list = list.filter((e) => e.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter((e) => {
      return (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)) ||
        (e.content && e.content.toLowerCase().includes(q))
      );
    });
  }

  list.sort((a, b) => {
    const dateA = new Date(a.learning_date).getTime();
    const dateB = new Date(b.learning_date).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  const total = list.length;
  const paginated = list.slice(offset, offset + limit);

  return { lessons: paginated, total };
}

/**
 * Get single lesson by slug
 */
export async function getLessonBySlug(slug: string, requirePublished = true): Promise<LearningEntry | null> {
  const supabase = getSupabaseAdmin() || getSupabaseClient();
  if (supabase) {
    try {
      let query = supabase.from("learning_entries").select("*").eq("slug", slug);
      if (requirePublished) {
        query = query.eq("status", "published");
      }
      const { data, error } = await query.single();
      if (!error && data) {
        return data as LearningEntry;
      }
    } catch (err) {
      console.warn("Supabase getLessonBySlug fallback:", err);
    }
  }

  const entries = await readAllEntries();
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return null;
  if (requirePublished && entry.status !== "published") return null;
  return entry;
}

/**
 * Get single lesson by ID
 */
export async function getLessonById(id: string): Promise<LearningEntry | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("learning_entries").select("*").eq("id", id).single();
      if (!error && data) {
        return data as LearningEntry;
      }
    } catch (err) {}
  }

  const entries = await readAllEntries();
  return entries.find((e) => e.id === id) || null;
}

/**
 * Create a new lesson
 */
export async function createLesson(input: CreateLessonInput): Promise<LearningEntry> {
  const now = new Date().toISOString();
  let slug = input.slug ? input.slug.trim() : "";
  if (!slug) {
    slug = await generateUniqueSlug(input.title);
  } else {
    slug = await generateUniqueSlug(slug);
  }

  const newEntry: LearningEntry = {
    id: `til-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    title: input.title.trim(),
    slug,
    summary: input.summary.trim(),
    content: input.content || "",
    learning_date: input.learning_date || new Date().toISOString().slice(0, 10),
    published_at: input.status === "published" ? now : null,
    category: input.category.trim() || "General Engineering",
    tags: Array.isArray(input.tags) ? input.tags.filter(Boolean) : [],
    key_takeaways: Array.isArray(input.key_takeaways) ? input.key_takeaways.filter(Boolean) : [],
    code_examples: Array.isArray(input.code_examples) ? input.code_examples : [],
    references: Array.isArray(input.references) ? input.references : [],
    cover_image_path: input.cover_image_path || null,
    document_path: input.document_path || null,
    document_filename: input.document_filename || null,
    document_mime_type: input.document_mime_type || null,
    document_size: input.document_size || null,
    status: input.status || "draft",
    created_at: now,
    updated_at: now,
  };

  // Sync to Supabase if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("learning_entries").insert(newEntry).select().single();
      if (!error && data) {
        // Also keep local copy updated
        const entries = await readAllEntries();
        entries.unshift(data as LearningEntry);
        await writeAllEntries(entries);
        return data as LearningEntry;
      }
    } catch (err) {
      console.warn("Supabase createLesson fallback to local:", err);
    }
  }

  // Local write
  const entries = await readAllEntries();
  entries.unshift(newEntry);
  await writeAllEntries(entries);
  return newEntry;
}

/**
 * Update an existing lesson
 */
export async function updateLesson(id: string, input: UpdateLessonInput): Promise<LearningEntry | null> {
  const current = await getLessonById(id);
  if (!current) return null;

  const now = new Date().toISOString();
  let slug = current.slug;
  if (input.slug && input.slug.trim() !== current.slug) {
    slug = await generateUniqueSlug(input.slug, id);
  } else if (input.title && input.title.trim() !== current.title && !input.slug) {
    slug = await generateUniqueSlug(input.title, id);
  }

  let published_at = current.published_at;
  if (input.status === "published" && current.status !== "published" && !published_at) {
    published_at = now;
  }

  if (input.document_path !== undefined && input.document_path !== current.document_path && current.document_path) {
    await deleteDocument(current.document_path);
  }

  const updated: LearningEntry = {
    ...current,
    ...input,
    slug,
    published_at,
    updated_at: now,
  };

  // Supabase update if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("learning_entries").update(updated).eq("id", id).select().single();
      if (!error && data) {
        // Also update local copy
        const entries = await readAllEntries();
        const idx = entries.findIndex((e) => e.id === id);
        if (idx !== -1) {
          entries[idx] = data as LearningEntry;
          await writeAllEntries(entries);
        }
        return data as LearningEntry;
      }
    } catch (err) {
      console.warn("Supabase update fallback to local:", err);
    }
  }

  // Local update
  const entries = await readAllEntries();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx !== -1) {
    entries[idx] = updated;
    await writeAllEntries(entries);
  }
  return updated;
}

/**
 * Delete a lesson and associated document
 */
export async function deleteLesson(id: string): Promise<boolean> {
  const target = await getLessonById(id);
  if (!target) return false;

  if (target.document_path) {
    await deleteDocument(target.document_path);
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("learning_entries").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete warning:", err);
    }
  }

  const entries = await readAllEntries();
  const filtered = entries.filter((e) => e.id !== id);
  await writeAllEntries(filtered);
  return true;
}

/**
 * Toggle publication status between published and draft
 */
export async function toggleLessonStatus(id: string): Promise<LearningEntry | null> {
  const target = await getLessonById(id);
  if (!target) return null;

  const newStatus: LessonStatus = target.status === "published" ? "draft" : "published";
  return updateLesson(id, { status: newStatus });
}

/**
 * Calculate genuine statistics strictly from actual published records
 */
export async function getLearningStats(): Promise<LearningStats> {
  const { lessons: allPublished } = await getLessons({ status: "published", limit: 500 });
  const { lessons: allDrafts } = await getLessons({ status: "draft", limit: 500 });

  const catMap: Record<string, number> = {};
  const tagMap: Record<string, number> = {};
  const activityByDate: Record<string, number> = {};

  allPublished.forEach((e) => {
    catMap[e.category] = (catMap[e.category] || 0) + 1;
    e.tags.forEach((t) => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });

    const d = e.learning_date;
    if (d) {
      activityByDate[d] = (activityByDate[d] || 0) + 1;
    }
  });

  const categories = Object.entries(catMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const tags = Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const sortedPublished = [...allPublished].sort((a, b) => {
    return new Date(b.learning_date).getTime() - new Date(a.learning_date).getTime();
  });
  const latestLesson = sortedPublished[0] || null;

  let streakDays = 0;
  if (allPublished.length > 0) {
    const dates = Array.from(new Set(allPublished.map((e) => e.learning_date))).sort().reverse();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (dates[0] === today || dates[0] === yesterday) {
      let currentCheck = new Date(dates[0]);
      for (const dStr of dates) {
        const expected = currentCheck.toISOString().slice(0, 10);
        if (dStr === expected) {
          streakDays++;
          currentCheck.setUTCDate(currentCheck.getUTCDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  return {
    totalPublished: allPublished.length,
    totalDrafts: allDrafts.length,
    totalLessons: allPublished.length + allDrafts.length,
    categories,
    tags,
    latestLesson,
    activityByDate,
    streakDays,
  };
}
