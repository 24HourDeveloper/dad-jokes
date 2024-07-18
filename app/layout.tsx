import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Chakra } from "./Chakra";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dad Jokes",
  description: "Jokes to make you laugh all day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} style={{ backgroundColor: '#1A202C' }}>
          <Chakra>
            <Header />
            {children}
          </Chakra>
        </body>
      </html>
    </ClerkProvider>
  );
}
