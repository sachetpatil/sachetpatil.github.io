"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="fixed bottom-5 right-5 z-50 rounded-full border border-[var(--foreground)] bg-[var(--background)] px-4 py-2 text-xs font-medium text-[var(--foreground)] uppercase hover:opacity-80 transition-opacity"
        >
            {theme === "light" ? "Dark" : "Light"}
        </button>
    )
}
