"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const [mounted, setMounted] = React.useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="fixed bottom-5 right-5 z-50 rounded-full border border-[var(--foreground)] bg-[var(--background)] px-4 py-2 text-xs font-medium text-[var(--foreground)] uppercase opacity-0">
                Theme
            </button>
        )
    }

    const toggleTheme = () => {
        if (theme === 'system') {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        } else if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('system')
        }
    }

    const getLabel = () => {
        if (theme === 'system') return 'System'
        if (theme === 'dark') return 'Dark'
        return 'Light'
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-5 right-5 z-50 rounded-full border border-[var(--foreground)] bg-[var(--background)] px-4 py-2 text-xs font-medium text-[var(--foreground)] uppercase hover:opacity-80 transition-opacity"
        >
            {getLabel()}
        </button>
    )
}
