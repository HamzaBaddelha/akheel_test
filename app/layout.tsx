import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import ChatLauncher from "@/components/chat/ChatLauncher";

export const metadata: Metadata = {
  title: "Akheel Travel — Discover Saudi & Morocco",
  description:
    "Curated journeys through Saudi Arabia and Morocco. Desert expeditions, cultural immersions, luxury escapes, and more.",
  keywords: ["travel", "Saudi Arabia", "Morocco", "luxury travel", "desert tours", "Akheel"],
  icons: {
    icon: "/assets/logo-white-no-background.png",
    shortcut: "/assets/logo-white-no-background.png",
    apple: "/assets/logo-white-no-background.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="font-sans" suppressHydrationWarning>
      <body>
        <I18nProvider>
          {children}
          <ChatLauncher />
        </I18nProvider>
      </body>
    </html>
  );
}
