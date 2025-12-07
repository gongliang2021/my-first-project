import Link from 'next/link';
import { Github, Twitter, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Web3 Daily</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Your trusted source for daily Web3 news, market insights, and celebrity updates. 
              Stay informed about the latest developments in blockchain, cryptocurrency, and decentralized technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors">Latest News</Link></li>
              <li><Link href="/celebrities" className="text-gray-400 hover:text-white transition-colors">Crypto Celebrities</Link></li>
              <li><Link href="/market" className="text-gray-400 hover:text-white transition-colors">Market Data</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/news?category=DeFi" className="text-gray-400 hover:text-white transition-colors">DeFi</Link></li>
              <li><Link href="/news?category=NFT" className="text-gray-400 hover:text-white transition-colors">NFTs</Link></li>
              <li><Link href="/news?category=Gaming" className="text-gray-400 hover:text-white transition-colors">Gaming</Link></li>
              <li><Link href="/news?category=Regulation" className="text-gray-400 hover:text-white transition-colors">Regulation</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Web3 Daily. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}