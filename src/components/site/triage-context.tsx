import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CategoryId } from "@/lib/site";

interface TriageContextValue {
  open: boolean;
  category: CategoryId | null;
  openTriage: (category?: CategoryId, source?: string) => void;
  closeTriage: () => void;
}

const TriageContext = createContext<TriageContextValue | null>(null);

export function TriageProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryId | null>(null);

  const openTriage = useCallback((next?: CategoryId) => {
    setCategory(next ?? null);
    setOpen(true);
  }, []);

  const closeTriage = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, category, openTriage, closeTriage }),
    [open, category, openTriage, closeTriage],
  );

  return <TriageContext.Provider value={value}>{children}</TriageContext.Provider>;
}

export function useTriage() {
  const ctx = useContext(TriageContext);
  if (!ctx) throw new Error("useTriage precisa estar dentro de TriageProvider");
  return ctx;
}
