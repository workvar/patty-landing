import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
}

export function GridBackground({ children }: GridBackgroundProps) {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          // Dotted background pattern
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look towards the edges/bottom if desired, 
          but for a full page wrapper we keep it subtle or remove the mask if we want full coverage.
          Keeping a large mask to focus attention on center. */}
      <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black)]"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}