"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ResumeModal } from "@/components/ResumeModal";

const ResumeModalContext = createContext<() => void>(() => {});

export function useResumeModal() {
  return useContext(ResumeModalContext);
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ResumeModalContext.Provider value={() => setOpen(true)}>
      {children}
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </ResumeModalContext.Provider>
  );
}
