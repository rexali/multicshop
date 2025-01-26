
import * as React from 'react';
import NavBar from '../components/common/navbar'
import BottomNavigation from '../components/common/bottom-navigation';
import BottomNavbar from '../components/common/bottom-navbar';
import AuthProvider from '../context/AuthContext';
import { Metadata } from "next";
import { AppProvider } from '../context/AppContext';
import HomeFallback from '../components/common/HomeFallback';
import type { Viewport } from 'next'

export const metadata: Metadata = {
  title: { absolute: "Cshop", template: "%s | a marketplace or an ecommerce" },
  description: "It is a marketplace or an ecommerce",
  keywords: ["shop", "marketplace", 'ecommerce'],
}

export const viewport: Viewport = {
  themeColor: 'green',
  width: "device-width",
  initialScale: 1.0
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" >
      <body>
        <AuthProvider>
          <AppProvider>
            <React.Suspense fallback={<HomeFallback />}>
              <NavBar />
              {children}
              <BottomNavigation />
              <BottomNavbar />
            </React.Suspense>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
