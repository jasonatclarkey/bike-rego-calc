'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavTop from "./navTop";
import { Paper } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <NavTop />
        <Paper sx={{ maxWidth: 500, pt: 2, m: "auto" }}>
          {children}
        </Paper>
      </body>
    </html>
  );
}
