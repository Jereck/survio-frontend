"use client"

import "./globals.css";
import { useAuthStore } from "@/store/authStore";
import { useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
