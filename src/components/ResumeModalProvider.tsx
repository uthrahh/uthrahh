"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ResumeModal } from "@/components/ResumeModal";
import { site } from "@/lib/data/site";

const ResumeModalContext = createContext<() => void>(() => {});

export function useResumeModal() {
  return useContext(ResumeModalContext);
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openResume = () => {
    if (site.resumeVariants.length === 1) {
      window.open(site.resumeVariants[0].url, "_blank", "noopener,noreferrer");
    } else {
      setOpen(true);
    }
  };

  return (
    <ResumeModalContext.Provider value={openResume}>
      {children}
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </ResumeModalContext.Provider>
  );
}
