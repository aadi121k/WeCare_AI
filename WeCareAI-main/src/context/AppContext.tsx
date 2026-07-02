import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Page =
  | "home"
  | "chat"
  | "opd"
  | "documents"
  | "queue"
  | "emergency"
  | "token"
  | "admin"
  | "report"
  | "settings";

type Language = "en" | "hi";

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;

  language: Language;
  toggleLanguage: () => void;

  t: (en: string, hi: string) => string;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  recommendedDepartment: string;
  setRecommendedDepartment: (dept: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [recommendedDepartment, setRecommendedDepartment] =
    useState("");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback(
    (en: string, hi: string) => {
      return language === "en" ? en : hi;
    },
    [language]
  );

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,

        language,
        toggleLanguage,

        t,

        sidebarOpen,
        setSidebarOpen,

        recommendedDepartment,
        setRecommendedDepartment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }

  return ctx;
}