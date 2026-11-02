"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ResumeModal } from "@/components/ResumeModal";
<<<<<<< HEAD
import { site } from "@/lib/data/site";
=======
>>>>>>> a924b1a6cbcdfc07f3ee01c081c67353d41995bd

const ResumeModalContext = createContext<() => void>(() => {});

export function useResumeModal() {
  return useContext(ResumeModalContext);
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

<<<<<<< HEAD
  const openResume = () => {
    if (site.resumeVariants.length === 1) {
      window.open(site.resumeVariants[0].url, "_blank", "noopener,noreferrer");
    } else {
      setOpen(true);
    }
  };

  return (
    <ResumeModalContext.Provider value={openResume}>
=======
  return (
    <ResumeModalContext.Provider value={() => setOpen(true)}>
>>>>>>> a924b1a6cbcdfc07f3ee01c081c67353d41995bd
      {children}
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </ResumeModalContext.Provider>
  );
}
