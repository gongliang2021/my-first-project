# Web3 Daily News - Full-Stack Monorepo

A complete Web3 daily news website with real-time data scraping, market insights, and celebrity updates from the cryptocurrency and blockchain industry.

## 🚀 Features

### Core Functionality
- **Real-time News Aggregation**: Automatically scrapes news from CoinDesk, Cointelegraph, The Block, and other authoritative sources
- **Market Data**: Live cryptocurrency prices, trends, and market statistics from CoinGecko API
- **Celebrity Updates**: Tracks updates from key Web3 personalities like Vitalik Buterin, CZ, Michael Saylor, etc.
- **Smart Categorization**: AI-powered content categorization by topic, blockchain, and sentiment analysis
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Pages & Features
1. **Homepage**: Today's headlines, market overview, trending celebrities
2. **News Page**: Filterable news with categories, chains, dates, and search
3. **Celebrities Page**: Profiles and updates from Web3 influencers
4. **Market Page**: Real-time prices, gainers/losers, market statistics

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma ORM** with SQLite database
- **Cheerio/Puppeteer** for web scraping
- **node-schedule** for automated tasks
- **Winston** for logging

### Data Sources
- **News**: CoinDesk, Cointelegraph, The Block (RSS feeds)
- **Market**: CoinGecko API (free, no API key required)
- **Social**: Twitter/X updates via public RSS aggregation
- **Update Frequency**: Every hour automatically

## 📦 Project Structure

```
web3-daily-news/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/ # React components
│   │   └── lib/       # Utilities and API clients
│   └── package.json
├── backend/           # Express backend API
│   ├── src/
│   │   ├── routes/    # API endpoints
│   │   ├── services/  # Business logic
│   │   ├── config/    # Configuration
│   │   └── scripts/   # Utility scripts
│   ├── prisma/        # Database schema
│   └── package.json
├── shared/           # Shared types and utilities
│   ├── src/
│   │   ├── types/     # TypeScript type definitions
│   │   └── utils/     # Shared utility functions
│   └── package.json
├── .gitignore
├── .env.example
├── package.json       # Root package.json for monorepo
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd web3-daily-news
npm run install:all
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your preferences (defaults work for local development)
```

3. **Initialize the database**:
```bash
cd backend
npm run db:push  # Creates SQLite database and tables
npm run db:generate  # Generates Prisma client
```

4. **Start the development servers**:
```bash
# From root directory - starts both frontend and backend
npm run dev

# Or start individually:
npm run dev:backend  # Backend on http://localhost:3001
npm run dev:frontend # Frontend on http://localhost:3000
```

5. **Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health Check: http://localhost:3001/api/health

## 📡 API Endpoints

### News
- `GET /api/news` - Get all news with optional filters
- `GET /api/news/headlines` - Get today's headlines
- `GET /api/news/categories` - Get available categories
- `GET /api/news/chains` - Get available blockchains
- `GET /api/news/:id` - Get specific news article

### Celebrities
- `GET /api/celebrities` - Get all celebrities
- `GET /api/celebrities/trending` - Get trending celebrities
- `GET /api/celebrities/:id` - Get specific celebrity
- `GET /api/celebrities/:id/updates` - Get celebrity updates

### Market
- `GET /api/market` - Get market data for all coins
- `GET /api/market/stats` - Get market statistics
- `GET /api/market/gainers` - Get top gainers
- `GET /api/market/losers` - Get top losers
- `GET /api/market/:symbol` - Get specific coin data

## 🔄 Data Updates

The system automatically updates data every hour:

1. **News Scraping**: Fetches latest articles from configured RSS feeds
2. **Celebrity Updates**: Retrieves latest updates from Web3 personalities
3. **Market Data**: Updates cryptocurrency prices and statistics

### Manual Scraping
```bash
cd backend
npm run scrape  # Run all scrapers manually
```

## 🗄 Database Schema

### Tables
- `news_items`: News articles with metadata
- `celebrities`: Web3 personality profiles
- `celebrity_updates`: Social media updates
- `market_data`: Cryptocurrency price data
- `trending_topics`: Trending topics analysis

### Database Management
```bash
cd backend
npm run db:studio  # Open Prisma Studio (database GUI)
npm run db:push    # Push schema changes to database
npm run db:migrate # Run database migrations
```

## 🎨 Customization

### Adding News Sources
Edit `backend/src/services/scraper.ts` to add new RSS feeds:

```typescript
private readonly newsSources = [
  {
    name: 'Your News Source',
    url: 'https://your-source.com/rss.xml',
    selector: 'item',
  },
  // ... existing sources
];
```

### Adding Celebrities
Edit `shared/src/utils/constants.ts` to add new celebrities:

```typescript
export const CELEBRITIES = [
  // ... existing celebrities
  {
    id: 'new-celebrity',
    name: 'Celebrity Name',
    username: 'twitter_handle',
    role: 'Role',
    twitterHandle: 'twitter_handle',
    expertise: ['Expertise1', 'Expertise2'],
  },
] as const;
```

## 🚀 Deployment

### Environment Variables
Production requires these environment variables:
- `DATABASE_URL`: Production database connection
- `NODE_ENV`: Set to 'production'
- `PORT`: Server port (default: 3001)

### Build Commands
```bash
# Build all packages
npm run build

# Build individual packages
npm run build:frontend
npm run build:backend
npm run build:shared

# Start production servers
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the logs in `backend/logs/`
2. Ensure all environment variables are set correctly
3. Verify the database is properly initialized
4. Check network connectivity for external APIs

## 🔄 Updates & Maintenance

The system is designed to run autonomously with:
- Automatic hourly data updates
- Error handling and logging
- Database cleanup and optimization
- Graceful error recovery

For maintenance:
- Monitor logs regularly
- Update news sources if RSS feeds change
- Scale database as data grows
- Monitor API rate limits

---

Built with ❤️ for the Web3 community