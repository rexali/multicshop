
import * as React from 'react';
import NavBar from '../components/common/navbar'
import BottomNavigation from '../components/common/bottom-navigation';
import BottomNavbar from '../components/common/bottom-navbar';
import AuthProvider from '../context/AuthContext';
import { Metadata } from "next";
import { AppProvider } from '../context/AppContext';
import HomeFallback from '../components/common/HomeFallback';
import { getInitialDataAPI } from './api/getInitialDataAPI';

export const metadata: Metadata = {
  title: { absolute: "Cshop", template: "%s | a marketplace or an ecommerce" },
  description: "It is a marketplace or an ecommerce",
  viewport: {
    width: "device-width",
    initialScale: 1.0
  },
  keywords: ["shop", "marketplace", 'ecommerce'],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let initialData = await getInitialDataAPI() ?? {};

  return (
    <html lang="en" >
      <body>
        <AuthProvider>
          <AppProvider>
            <React.Suspense fallback={<HomeFallback />}>
              <NavBar categoryData={initialData?.categoryData} />
              {children}
              <BottomNavigation />
              <BottomNavbar />
            </React.Suspense>
          </AppProvider>
        </AuthProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js" async></script>
      </body>
    </html>
  );
}
