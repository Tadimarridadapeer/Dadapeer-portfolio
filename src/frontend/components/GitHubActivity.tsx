"use client";

import { useEffect, useState, useMemo } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0 to 4
}

// Exact active contribution days for @Tadimarridadapeer over the rolling 53-week period
const FALLBACK_ACTIVE_DAYS: Record<string, { count: number; level: number }> = {
  "2025-11-05": { count: 1, level: 1 },
  "2025-12-14": { count: 2, level: 2 },
  "2026-01-03": { count: 1, level: 1 },
  "2026-01-23": { count: 1, level: 1 },
  "2026-03-03": { count: 3, level: 2 },
  "2026-04-11": { count: 1, level: 1 },
  "2026-04-13": { count: 4, level: 3 },
  "2026-05-10": { count: 4, level: 3 },
  "2026-05-23": { count: 1, level: 1 },
  "2026-06-21": { count: 3, level: 2 },
  "2026-06-25": { count: 1, level: 1 },
  "2026-07-01": { count: 4, level: 3 },
  "2026-07-05": { count: 1, level: 1 },
  "2026-07-09": { count: 1, level: 1 },
  "2026-07-13": { count: 1, level: 1 },
  "2026-07-18": { count: 3, level: 2 },
  "2026-07-19": { count: 4, level: 3 },
  "2026-07-23": { count: 4, level: 3 },
  "2026-07-26": { count: 1, level: 1 },
  "2026-08-02": { count: 6, level: 4 },
  "2026-08-08": { count: 3, level: 2 },
  "2026-08-10": { count: 2, level: 2 },
  "2026-08-11": { count: 6, level: 4 },
  "2026-08-12": { count: 4, level: 3 },
  "2026-08-13": { count: 4, level: 3 },
  "2026-08-15": { count: 17, level: 4 },
  "2026-08-16": { count: 2, level: 2 },
  "2026-08-18": { count: 4, level: 3 },
  "2026-08-19": { count: 5, level: 4 },
  "2026-08-21": { count: 2, level: 2 },
  "2026-08-23": { count: 19, level: 4 },
  "2026-08-24": { count: 16, level: 4 },
  "2026-08-25": { count: 3, level: 2 },
  "2026-08-26": { count: 6, level: 4 },
  "2026-08-28": { count: 2, level: 2 },
  "2026-08-29": { count: 1, level: 1 },
  "2026-08-30": { count: 2, level: 2 },
  "2026-09-04": { count: 2, level: 2 },
  "2026-09-05": { count: 5, level: 4 },
  "2026-09-07": { count: 1, level: 1 },
  "2026-09-08": { count: 1, level: 1 },
  "2026-09-11": { count: 2, level: 2 },
  "2026-09-16": { count: 4, level: 3 },
  "2026-09-22": { count: 2, level: 2 },
  "2026-09-24": { count: 6, level: 4 },
  "2026-10-09": { count: 2, level: 2 },
  "2026-10-19": { count: 1, level: 1 },
  "2026-10-24": { count: 5, level: 4 },
};

// Clean UI-blended contribution levels matching the light editorial theme
const COLOR_MAP: Record<number, string> = {
  0: "bg-[#EBEDF0] border border-[#E1E4E8]/60",
  1: "bg-[#9BE9A8]",
  2: "bg-[#40C463]",
  3: "bg-[#30A14E]",
  4: "bg-[#216E39]",
};

export function GitHubActivity() {
  const [liveContributions, setLiveContributions] = useState<Map<string, ContributionDay>>(new Map());
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchLive() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/Tadimarridadapeer");
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        if (json && Array.isArray(json.contributions) && isMounted) {
          const map = new Map<string, ContributionDay>();
          json.contributions.forEach((c: ContributionDay) => {
            map.set(c.date, c);
          });
          setLiveContributions(map);
        }
      } catch (e) {
        // Fallback remains active seamlessly
      }
    }
    fetchLive();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute 53 weeks ending on today's week
  const { weeks, totalCount, monthHeaders } = useMemo(() => {
    const end = new Date("2026-10-24T12:00:00Z");
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (53 * 7 - 1));

    const weeksList: ContributionDay[][] = [];
    let curr = new Date(start);
    let total = 0;

    for (let w = 0; w < 53; w++) {
      const week: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = curr.toISOString().slice(0, 10);
        let count = 0;
        let level = 0;

        if (liveContributions.has(dateStr)) {
          const liveItem = liveContributions.get(dateStr)!;
          count = liveItem.count;
          level = liveItem.level;
        } else if (FALLBACK_ACTIVE_DAYS[dateStr]) {
          count = FALLBACK_ACTIVE_DAYS[dateStr].count;
          level = FALLBACK_ACTIVE_DAYS[dateStr].level;
        }

        total += count;
        week.push({ date: dateStr, count, level });
        curr.setUTCDate(curr.getUTCDate() + 1);
      }
      weeksList.push(week);
    }

    // Determine month headers across the 53 week columns
    const headers: { weekIndex: number; month: string }[] = [];
    let lastSeenMonth = -1;

    weeksList.forEach((w, idx) => {
      const date = new Date(w[0].date + "T12:00:00Z");
      const month = date.getUTCMonth();
      if (idx === 0) {
        headers.push({
          weekIndex: 0,
          month: date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
        });
        lastSeenMonth = month;
      } else {
        const changedDay = w.find((day) => {
          const m = new Date(day.date + "T12:00:00Z").getUTCMonth();
          return m !== lastSeenMonth;
        });
        if (changedDay) {
          const m = new Date(changedDay.date + "T12:00:00Z").getUTCMonth();
          lastSeenMonth = m;
          if (idx <= 50) {
            headers.push({
              weekIndex: idx,
              month: new Date(changedDay.date + "T12:00:00Z").toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
            });
          }
        }
      }
    });

    return { weeks: weeksList, totalCount: total, monthHeaders: headers };
  }, [liveContributions]);

  return (
    <section id="github-activity" className="w-full py-12 md:py-16 border-t border-border">
      {/* Section Header consistent with the rest of the site */}
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-mono text-secondary">
              Open Source & Activity
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
            GitHub Contributions
          </h2>
        </div>

        <a
          href="https://github.com/Tadimarridadapeer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-border bg-white hover:bg-secondary/10 text-primary transition-all shadow-xs self-start sm:self-auto group"
        >
          <span>@Tadimarridadapeer</span>
          <ExternalLink className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
        </a>
      </div>

      {/* Main Contribution Card - Blended with UI */}
      <div className="rounded-3xl border border-border bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-xs">
        {/* Top bar inside card */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <h3 className="text-sm sm:text-base font-medium text-primary tracking-tight">
            {totalCount} contributions in the last year
          </h3>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors focus:outline-none"
            >
              <span>Contribution settings</span>
              <ChevronDown className="w-3.5 h-3.5 text-secondary" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-white py-1.5 shadow-lg z-30 text-xs text-primary">
                <a
                  href="https://github.com/Tadimarridadapeer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2 hover:bg-secondary/10 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="font-medium">View GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                </a>
                <a
                  href="https://github.com/Tadimarridadapeer?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2 hover:bg-secondary/10 transition-colors border-t border-border/50"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span>18 Public Repositories</span>
                  <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Contribution Heatmap Grid */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="min-w-[760px] select-none py-1">
            {/* Months Row */}
            <div className="relative flex text-[10px] text-secondary font-mono mb-2 h-4 ml-[32px]">
              {monthHeaders.map((header) => (
                <span
                  key={`${header.weekIndex}-${header.month}`}
                  className="absolute"
                  style={{ left: `${header.weekIndex * 14}px` }}
                >
                  {header.month}
                </span>
              ))}
            </div>

            {/* Grid: Weekday Labels + 53 Columns */}
            <div className="flex gap-[4px] items-start">
              {/* Days of week */}
              <div className="flex flex-col gap-[3px] text-[10px] text-secondary font-mono w-[28px] pr-1">
                <span className="h-[11px] leading-[11px]" />
                <span className="h-[11px] leading-[11px]">Mon</span>
                <span className="h-[11px] leading-[11px]" />
                <span className="h-[11px] leading-[11px]">Wed</span>
                <span className="h-[11px] leading-[11px]" />
                <span className="h-[11px] leading-[11px]">Fri</span>
                <span className="h-[11px] leading-[11px]" />
              </div>

              {/* 53 Columns */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day) => {
                      const colorClass = COLOR_MAP[day.level] || COLOR_MAP[0];
                      return (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-[11px] h-[11px] rounded-[2.5px] transition-all hover:scale-125 hover:z-20 cursor-pointer ${colorClass}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer inside */}
            <div className="flex items-center justify-between text-xs text-secondary mt-5 pt-3 border-t border-border/60">
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:underline underline-offset-2"
              >
                Learn how we count contributions
              </a>

              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span>Less</span>
                <div className="flex items-center gap-[3px]">
                  <span className="w-[11px] h-[11px] rounded-[2px] bg-[#EBEDF0] border border-[#E1E4E8]/60" />
                  <span className="w-[11px] h-[11px] rounded-[2px] bg-[#9BE9A8]" />
                  <span className="w-[11px] h-[11px] rounded-[2px] bg-[#40C463]" />
                  <span className="w-[11px] h-[11px] rounded-[2px] bg-[#30A14E]" />
                  <span className="w-[11px] h-[11px] rounded-[2px] bg-[#216E39]" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs shadow-xl whitespace-nowrap font-mono"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
          }}
        >
          <span className="font-semibold text-emerald-400">
            {hoveredDay.day.count === 0
              ? "No contributions"
              : `${hoveredDay.day.count} contribution${hoveredDay.day.count === 1 ? "" : "s"}`}
          </span>{" "}
          on{" "}
          {new Date(hoveredDay.day.date + "T12:00:00Z").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </div>
      )}
    </section>
  );
}
