"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import {HeroUIProvider} from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <HeroUIProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
