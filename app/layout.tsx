import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/lib/settings-context";
import { SettingsModeProvider } from "@/components/settings-mode-provider";

export const metadata: Metadata = {
  title: "JobPilot",
  description: "Your smart companion for job hunting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <SettingsModeProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SettingsModeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
