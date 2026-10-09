import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
export const metadata: Metadata = { title: "Pixelloom — Collaborative design, in flow", description: "A shared infinite canvas for teams to think, sketch, and ship together." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }