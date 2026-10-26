"use client";

import React, { useMemo, useState } from "react";

interface LearningCalendarGridProps {
  activityByDate: Record<string, number>; // date YYYY-MM-DD -> count
  streakDays: number;
}

export function LearningCalendarGrid({ activityByDate, streakDays }: LearningCalendarGridProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  // Generate 26 weeks (6 months) up to today
  const { weeks, totalContributions, monthHeaders } = useMemo(() => {
    const end = new Date();
    // End on current week Saturday
    const dayOfWeek = end.getDay(); // 0 is Sun, 6 is Sat
    const daysToSat = 6 - dayOfWeek;
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + daysToSat);

    const numWeeks = 26;
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (numWeeks * 7 - 1));

    const weeksList: { date: string; count: number }[][] = [];
    let curr = new Date(startDate);
    let total = 0;

    for (let w = 0; w < numWeeks; w++) {
      const week: { date: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = curr.toISOString().slice(0, 10);
        const count = activityByDate[dateStr] || 0;
        total += count;
        week.push({ date: dateStr, count });
        curr.setDate(curr.getDate() + 1);
      }
      weeksList.push(week);
    }

    // Determine month headers
    const headers: { weekIndex: number; month: string }[] = [];
    let lastSeenMonth = -1;

    weeksList.forEach((w, idx) => {
      const d = new Date(w[0].date);
      const m = d.getMonth();
      if (idx === 0) {
        headers.push({
          weekIndex: 0,
          month: d.toLocaleString("en-US", { month: "short" }),
        });
        lastSeenMonth = m;
      } else {
        const changedDay = w.find((day) => new Date(day.date).getMonth() !== lastSeenMonth);
        if (changedDay) {
          lastSeenMonth = new Date(changedDay.date).getMonth();
          if (idx <= numWeeks - 3) {
            headers.push({
              weekIndex: idx,
              month: new Date(changedDay.date).toLocaleString("en-US", { month: "short" }),
            });
          }
        }
      }
    });

    return { weeks: weeksList, totalContributions: total, monthHeaders: headers };
  }, [activityByDate]);

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-[#EBEDF0] border border-[#E1E4E8]/60";
    if (count === 1) return "bg-[#9BE9A8] border border-[#9BE9A8]";
    if (count === 2) return "bg-[#40C463] border border-[#40C463]";
    return "bg-[#216E39] border border-[#216E39]";
  };

  return (
    <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-primary">Learning Activity</span>
          <span className="text-xs font-mono text-secondary">
            {totalContributions} lesson{totalContributions === 1 ? "" : "s"} logged in last 6 months
          </span>
        </div>

        {streakDays > 0 ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{streakDays} Day Learning Streak</span>
          </div>
        ) : (
          <span className="text-xs font-mono text-secondary/60">Consistent daily engineering</span>
        )}
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="min-w-[420px] select-none py-1">
          {/* Month labels */}
          <div className="relative flex text-[10px] text-secondary font-mono mb-2 h-4 ml-[26px]">
            {monthHeaders.map((header) => (
              <span
                key={`${header.weekIndex}-${header.month}`}
                className="absolute"
                style={{ left: `${header.weekIndex * 15}px` }}
              >
                {header.month}
              </span>
            ))}
          </div>

          <div className="flex gap-[4px] items-start">
            {/* Days of week */}
            <div className="flex flex-col gap-[3px] text-[9px] text-secondary/70 font-mono w-[22px] pr-1">
              <span className="h-[11px]" />
              <span className="h-[11px] leading-[11px]">Mon</span>
              <span className="h-[11px]" />
              <span className="h-[11px] leading-[11px]">Wed</span>
              <span className="h-[11px]" />
              <span className="h-[11px] leading-[11px]">Fri</span>
              <span className="h-[11px]" />
            </div>

            {/* Week columns */}
            <div className="flex gap-[3.5px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    return (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-[11px] h-[11px] rounded-[2.5px] transition-all hover:scale-125 hover:z-20 cursor-pointer ${getColorClass(
                          day.count
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Legend */}
          <div className="flex items-center justify-between text-xs text-secondary/70 mt-3.5 pt-2 border-t border-border/40 font-mono text-[10px]">
            <span>Activity based on verified publication dates</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex items-center gap-[3px]">
                <span className="w-[10px] h-[10px] rounded-[2px] bg-[#EBEDF0] border border-[#E1E4E8]/60" />
                <span className="w-[10px] h-[10px] rounded-[2px] bg-[#9BE9A8]" />
                <span className="w-[10px] h-[10px] rounded-[2px] bg-[#40C463]" />
                <span className="w-[10px] h-[10px] rounded-[2px] bg-[#216E39]" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1 rounded-lg bg-primary text-white text-xs shadow-lg whitespace-nowrap font-mono"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 6}px`,
          }}
        >
          <span className="font-semibold text-emerald-400">
            {hoveredDay.count === 0 ? "No lessons" : `${hoveredDay.count} lesson${hoveredDay.count === 1 ? "" : "s"}`}
          </span>{" "}
          on {hoveredDay.date}
        </div>
      )}
    </div>
  );
}
