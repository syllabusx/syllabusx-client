"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Analytics } from "@vercel/analytics/react";
import { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme/theme-provider";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Toaster } from "./ui/toaster";

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 60 * 8,
                gcTime: 1000 * 60 * 60 * 8,
            },
        }, // 8 hours
    });

    const persister = createSyncStoragePersister({
        storage: typeof window !== "undefined" ? window.localStorage : null,
    });

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
                <Toaster />
            </ThemeProvider>
            <ThemeSwitcher />
            <Analytics />
            <ReactQueryDevtools />
        </PersistQueryClientProvider>
    );
};

export default Providers;
