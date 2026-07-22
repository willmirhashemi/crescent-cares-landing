import './globals.css';

import { Inter } from 'next/font/google';

// TWK Lausanne (the Figma font) isn't freely available; Inter is the closest
// free neo-grotesque match. Applied globally as the app's default font.
const inter = Inter({ subsets: ['latin'], display: 'swap' });

let title = 'Next.js + Postgres Auth Starter';
let description =
  'This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
