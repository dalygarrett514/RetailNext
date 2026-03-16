import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/providers/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "RetailNext Shop",
  description: "A polished demo storefront for the RetailNext interview exercise.",
  icons: {
    icon: "/favicon.ico?v=20260316",
    shortcut: "/favicon.ico?v=20260316",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <div className="min-h-screen">
            <SiteHeader />
            <main>{children}</main>
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
