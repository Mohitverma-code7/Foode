import React, { createContext, useContext, useMemo, useState } from "react";

type DrawerContextValue = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      openDrawer: () => setOpen(true),
      closeDrawer: () => setOpen(false),
      toggleDrawer: () => setOpen((current) => !current),
    }),
    [open],
  );

  return <DrawerContext.Provider value={value}>{props.children}</DrawerContext.Provider>;
}

export function useDrawer() {
  const context = useContext(DrawerContext);

  if (!context) {
    return {
      open: false,
      openDrawer: () => undefined,
      closeDrawer: () => undefined,
      toggleDrawer: () => undefined,
    };
  }

  return context;
}
