import type { Metadata } from 'next'
import Providers from '@/components/providers/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'CTCDMS',
  description: 'Clinical Test Center Data Management System',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
