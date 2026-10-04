import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCurrentLocale, getCurrentDictionary } from "@/lib/i18n-server";
import { generatePageSeo, generateOrganizationJsonLd } from "@/lib/seo";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { ThemeProvider } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getCurrentDictionary();

  return {
    ...generatePageSeo({
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale,
    }),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: dict.metadata.title,
    },
    formatDetection: {
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d5c63" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1317" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data — Organization / Hospital */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
