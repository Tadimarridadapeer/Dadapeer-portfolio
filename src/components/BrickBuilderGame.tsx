"use client";

import React, { useState, useRef, useCallback } from "react";

export type BrickColor = "red" | "yellow" | "blue";

export interface Brick {
  id: string;
  x: number; // 0..25 column index
  y: number; // 0..6 row index (0 is bottom)
  w: number; // width in stud units
  color: BrickColor;
}

const COLS = 26;
const ROWS = 7;

// Exact color palette matching the original reference
const COLOR_THEMES: Record<
  BrickColor,
  {
    bg: string;
    border: string;
    studGradient: string;
    studShadow: string;
  }
> = {
  red: {
    bg: "bg-[#FF5533]",
    border: "border-[#D93D1A]",
    studGradient: "radial-gradient(circle at 35% 30%, #FF7F63 0%, #FF5533 55%, #D43615 100%)",
    studShadow: "0 2px 3px rgba(0,0,0,0.22), inset 0 1px 1.5px rgba(255,255,255,0.45)",
  },
  yellow: {
    bg: "bg-[#FFD633]",
    border: "border-[#D9B214]",
    studGradient: "radial-gradient(circle at 35% 30%, #FFE575 0%, #FFD633 55%, #D9AC00 100%)",
    studShadow: "0 2px 3px rgba(0,0,0,0.18), inset 0 1px 1.5px rgba(255,255,255,0.55)",
  },
  blue: {
    bg: "bg-[#4BA3E3]",
    border: "border-[#2680C2]",
    studGradient: "radial-gradient(circle at 35% 30%, #76C5FF 0%, #4BA3E3 55%, #1F77B8 100%)",
    studShadow: "0 2px 3px rgba(0,0,0,0.22), inset 0 1px 1.5px rgba(255,255,255,0.45)",
  },
};

// Initial brick arrangement matching the reference screenshot exactly across all 26 columns
const INITIAL_BRICKS: Brick[] = [
  // Row 0 (bottom row - fully covers all 26 columns from x=0 to x=25)
  { id: "b0-1", x: 0, y: 0, w: 4, color: "red" },
  { id: "b0-2", x: 4, y: 0, w: 3, color: "yellow" },
  { id: "b0-3", x: 7, y: 0, w: 3, color: "blue" },
  { id: "b0-4", x: 10, y: 0, w: 2, color: "red" },
  { id: "b0-5", x: 12, y: 0, w: 4, color: "yellow" },
  { id: "b0-6", x: 16, y: 0, w: 3, color: "blue" },
  { id: "b0-7", x: 19, y: 0, w: 4, color: "red" },
  { id: "b0-8", x: 23, y: 0, w: 3, color: "yellow" },

  // Row 1
  { id: "b1-1", x: 0, y: 1, w: 2, color: "blue" },
  { id: "b1-2", x: 2, y: 1, w: 3, color: "red" },
  { id: "b1-3", x: 5, y: 1, w: 4, color: "yellow" },
  { id: "b1-4", x: 9, y: 1, w: 1, color: "blue" },
  { id: "b1-5", x: 10, y: 1, w: 3, color: "red" },
  { id: "b1-6", x: 14, y: 1, w: 2, color: "yellow" },
  { id: "b1-7", x: 18, y: 1, w: 4, color: "red" },
  { id: "b1-8", x: 23, y: 1, w: 3, color: "yellow" },

  // Row 2
  { id: "b2-1", x: 0, y: 2, w: 3, color: "yellow" },
  { id: "b2-2", x: 3, y: 2, w: 4, color: "red" },
  { id: "b2-3", x: 10, y: 2, w: 4, color: "blue" },
  { id: "b2-4", x: 14, y: 2, w: 3, color: "yellow" },
  { id: "b2-5", x: 17, y: 2, w: 3, color: "red" },
  { id: "b2-6", x: 20, y: 2, w: 1, color: "yellow" },

  // Row 3
  { id: "b3-1", x: 3, y: 3, w: 4, color: "blue" },
  { id: "b3-2", x: 7, y: 3, w: 1, color: "red" },
  { id: "b3-3", x: 8, y: 3, w: 4, color: "blue" },
  { id: "b3-4", x: 14, y: 3, w: 2, color: "yellow" },
  { id: "b3-5", x: 19, y: 3, w: 2, color: "yellow" },

  // Row 4
  { id: "b4-1", x: 6, y: 4, w: 5, color: "yellow" },
  { id: "b4-2", x: 14, y: 4, w: 5, color: "blue" },

  // Row 5
  { id: "b5-1", x: 8, y: 5, w: 2, color: "blue" },
  { id: "b5-2", x: 10, y: 5, w: 2, color: "red" },
];

// Helper: Check if a slot (x..x+w-1, y) is free of other bricks
function isPositionFree(bricks: Brick[], x: number, y: number, w: number): boolean {
  if (x < 0 || x + w > COLS) return false;
  if (y < 0 || y >= ROWS) return false;

  for (const b of bricks) {
    if (b.y === y) {
      if (Math.max(x, b.x) < Math.min(x + w, b.x + b.w)) {
        return false; // Collision with existing brick
      }
    }
  }
  return true;
}

// Helper: Calculate highest resting height across given columns
function getHighestAtCols(bricks: Brick[], startX: number, width: number): number {
  let maxY = 0;
  for (let x = startX; x < startX + width; x++) {
    for (const b of bricks) {
      if (x >= b.x && x < b.x + b.w) {
        maxY = Math.max(maxY, b.y + 1);
      }
    }
  }
  return maxY;
}

// Component to render individual toy brick with 2D front circular studs
function ToyBrickView({
  brick,
  isDragging = false,
  dragGhost = false,
}: {
  brick: Brick;
  isDragging?: boolean;
  dragGhost?: boolean;
}) {
  const theme = COLOR_THEMES[brick.color];

  return (
    <div
      className={`relative w-full h-full flex rounded-[5px] select-none ${
        theme.bg
      } ${
        isDragging
          ? "border-2 border-black z-50 shadow-2xl opacity-95 scale-[1.01]"
          : dragGhost
          ? "border-2 border-dashed border-black/40 opacity-40"
          : `border ${theme.border} shadow-[inset_0_1.5px_0_rgba(255,255,255,0.38),inset_0_-2px_0_rgba(0,0,0,0.18)]`
      }`}
    >
      {/* Front circular studs */}
      {Array.from({ length: brick.w }).map((_, i) => (
        <div key={i} className="flex-1 h-full flex items-center justify-center p-0.5">
          <div
            className="w-[58%] aspect-square rounded-full flex items-center justify-center pointer-events-none"
            style={{
              background: theme.studGradient,
              boxShadow: theme.studShadow,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function BrickBuilderGame() {
  const [bricks, setBricks] = useState<Brick[]>(INITIAL_BRICKS);
  const [draggedBrick, setDraggedBrick] = useState<Brick | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragPointer, setDragPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset to original reference layout
  const handleReset = () => {
    setBricks(INITIAL_BRICKS);
    setDraggedBrick(null);
    setPreviewPos(null);
  };

  // Pointer down to begin dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, brick: Brick) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;
    const brickRect = e.currentTarget.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - brickRect.left,
      y: e.clientY - brickRect.top,
    });
    setDragPointer({ x: e.clientX, y: e.clientY });
    setDraggedBrick(brick);
    setPreviewPos({ x: brick.x, y: brick.y });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Pointer move while dragging — fits directly to aimed position (X and Y)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggedBrick || !containerRef.current) return;
    e.preventDefault();

    setDragPointer({ x: e.clientX, y: e.clientY });

    const rect = containerRef.current.getBoundingClientRect();
    const colWidth = rect.width / COLS;
    const rowHeight = rect.height / ROWS;

    // Aimed top-left of the brick
    const brickLeft = e.clientX - rect.left - dragOffset.x;
    const brickTop = e.clientY - rect.top - dragOffset.y;
    const brickBottom = brickTop + rowHeight;

    // Calculate aimed column (0..COLS - w)
    const targetCol = Math.max(0, Math.min(COLS - draggedBrick.w, Math.round(brickLeft / colWidth)));

    // Calculate aimed row (0 is bottom, ROWS - 1 is top)
    const relYFromBottom = rect.height - brickBottom;
    const targetRow = Math.max(0, Math.min(ROWS - 1, Math.round(relYFromBottom / rowHeight)));

    const otherBricks = bricks.filter((b) => b.id !== draggedBrick.id);

    let snapX = targetCol;
    let snapY = targetRow;

    // Check if the aimed position is free
    if (!isPositionFree(otherBricks, snapX, snapY, draggedBrick.w)) {
      // If occupied, snap to nearest free row or resting stack height
      const highestAtCols = getHighestAtCols(otherBricks, snapX, draggedBrick.w);
      snapY = Math.min(ROWS - 1, highestAtCols);
    }

    setPreviewPos({ x: snapX, y: snapY });
  };

  // Pointer up to drop brick into place
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggedBrick || !containerRef.current) return;
    e.preventDefault();

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const otherBricks = bricks.filter((b) => b.id !== draggedBrick.id);

    let finalX = previewPos ? previewPos.x : draggedBrick.x;
    let finalY = previewPos ? previewPos.y : draggedBrick.y;

    if (!isPositionFree(otherBricks, finalX, finalY, draggedBrick.w)) {
      finalY = Math.min(ROWS - 1, getHighestAtCols(otherBricks, finalX, draggedBrick.w));
    }

    const placedBrick: Brick = {
      ...draggedBrick,
      x: finalX,
      y: finalY,
    };

    let nextBricks = [...otherBricks, placedBrick];

    // Check for "SAME-COLOR ROWS DROP"
    for (let r = 0; r < ROWS; r++) {
      const rowCells = new Array<BrickColor | null>(COLS).fill(null);
      for (const b of nextBricks) {
        if (b.y === r) {
          for (let c = b.x; c < b.x + b.w; c++) {
            rowCells[c] = b.color;
          }
        }
      }

      const isFull = rowCells.every((c) => c !== null);
      if (isFull) {
        const firstColor = rowCells[0];
        const isSameColor = rowCells.every((c) => c === firstColor);
        if (isSameColor) {
          // Clear matching row and drop all bricks above
          nextBricks = nextBricks
            .filter((b) => b.y !== r)
            .map((b) => (b.y > r ? { ...b, y: b.y - 1 } : b));
        }
      }
    }

    setBricks(nextBricks);
    setDraggedBrick(null);
    setPreviewPos(null);
  };

  const containerRect = containerRef.current?.getBoundingClientRect();

  return (
    <div className="w-full flex flex-col select-none">
      {/* Top Header & Minimal Controls */}
      <div className="w-full flex flex-row items-center justify-between pb-6 sm:pb-8">
        <h3 className="text-xl sm:text-2xl font-normal text-primary tracking-tight">
          Let&apos;s build something people love &lt;3
        </h3>

        {/* Minimal Control Text Matching Reference */}
        <div className="text-[11px] sm:text-xs font-mono tracking-wider text-secondary/60 uppercase flex items-center gap-1.5 sm:gap-2">
          <span>DRAG</span>
          <span>·</span>
          <span>SAME-COLOR ROWS DROP</span>
          <span>·</span>
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-primary underline cursor-pointer transition-colors font-medium text-secondary"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Playing Field — Spanning Full Width, Touching Left and Right */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-[26/6.8] min-h-[170px] sm:min-h-[220px] md:min-h-[260px] overflow-visible touch-none"
      >
        {/* Render Resting Bricks */}
        {bricks.map((brick) => {
          const isBeingDragged = draggedBrick?.id === brick.id;

          return (
            <div
              key={brick.id}
              onPointerDown={(e) => handlePointerDown(e, brick)}
              style={{
                left: `${(brick.x / COLS) * 100}%`,
                bottom: `${(brick.y / ROWS) * 100}%`,
                width: `${(brick.w / COLS) * 100}%`,
                height: `${(1 / ROWS) * 100}%`,
                opacity: isBeingDragged ? 0.2 : 1,
              }}
              className="absolute p-[1px] cursor-grab active:cursor-grabbing transition-opacity"
            >
              <ToyBrickView brick={brick} />
            </div>
          );
        })}

        {/* Ghost Preview showing exact fit */}
        {draggedBrick && previewPos && (
          <div
            style={{
              left: `${(previewPos.x / COLS) * 100}%`,
              bottom: `${(previewPos.y / ROWS) * 100}%`,
              width: `${(draggedBrick.w / COLS) * 100}%`,
              height: `${(1 / ROWS) * 100}%`,
            }}
            className="absolute p-[1px] pointer-events-none z-10"
          >
            <ToyBrickView brick={draggedBrick} dragGhost={true} />
          </div>
        )}

        {/* Free Floating Dragged Brick */}
        {draggedBrick && containerRect && (
          <div
            style={{
              left: `${dragPointer.x - containerRect.left - dragOffset.x}px`,
              top: `${dragPointer.y - containerRect.top - dragOffset.y}px`,
              width: `${(draggedBrick.w / COLS) * containerRect.width}px`,
              height: `${(1 / ROWS) * containerRect.height}px`,
            }}
            className="absolute pointer-events-none z-50"
          >
            <ToyBrickView brick={draggedBrick} isDragging={true} />
          </div>
        )}
      </div>
    </div>
  );
}
