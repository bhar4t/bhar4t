"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const ThemeContext = createContext({
  darkModeActive: false,
  switchToDarkMode: () => {},
  switchToLightMode: () => {},
});

export function ThemeProvider({ children }) {
  const [darkModeActive, setDarkModeActive] = useState(false);

  // Sync with the theme the inline boot script already applied to <html> before hydration.
  useEffect(() => {
    setDarkModeActive(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const applyTheme = useCallback((isDark) => {
    setDarkModeActive(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // localStorage unavailable (e.g. private browsing); theme just won't persist.
    }
  }, []);

  const switchToDarkMode = useCallback(() => applyTheme(true), [applyTheme]);
  const switchToLightMode = useCallback(() => applyTheme(false), [applyTheme]);

  return (
    <ThemeContext.Provider value={{ darkModeActive, switchToDarkMode, switchToLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(ThemeContext);
}

// Runs before hydration (via a <script> tag in the root layout) to avoid a theme flash.
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
