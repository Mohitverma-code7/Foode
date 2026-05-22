import { getItem, setItem } from "@/lib/storage";
import { darkTheme, lightTheme, ThemeColors, ThemeMode } from "@/theme/colors";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  ready: boolean;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleMode: () => Promise<void>;
};

const THEME_KEY = "foodapp:theme-mode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider(props: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const savedMode = await getItem(THEME_KEY);
      if (!mounted) return;

      if (savedMode === "dark" || savedMode === "light") {
        setModeState(savedMode);
      } else {
        setModeState(Appearance.getColorScheme() === "dark" ? "dark" : "light");
      }
      setReady(true);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  async function setMode(modeValue: ThemeMode) {
    setModeState(modeValue);
    await setItem(THEME_KEY, modeValue);
  }

  async function toggleMode() {
    await setMode(mode === "dark" ? "light" : "dark");
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: mode === "dark" ? darkTheme : lightTheme,
      ready,
      setMode,
      toggleMode,
    }),
    [mode, ready],
  );

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      mode: "light" as ThemeMode,
      colors: lightTheme,
      ready: true,
      setMode: async () => undefined,
      toggleMode: async () => undefined,
    };
  }
  return context;
}
