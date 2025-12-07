import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 Daily - Your Source for Crypto News & Market Insights',
  description: 'Stay updated with the latest Web3 news, cryptocurrency market data, and insights from industry leaders. Real-time updates on blockchain, DeFi, NFTs, and more.',
  keywords: 'Web3, cryptocurrency, blockchain, DeFi, NFT, Bitcoin, Ethereum, crypto news',
  authors: [{ name: 'Web3 Daily Team' }],
  openGraph: {
    title: 'Web3 Daily - Your Source for Crypto News & Market Insights',
    description: 'Stay updated with the latest Web3 news, cryptocurrency market data, and insights from industry leaders.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 Daily - Your Source for Crypto News & Market Insights',
    description: 'Stay updated with the latest Web3 news, cryptocurrency market data, and insights from industry leaders.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}