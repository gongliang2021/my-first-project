import dotenv from 'dotenv';
import * as schedule from 'node-schedule';
import app from './app';
import { ScraperService } from './services/scraper';
import { logger } from './config/logger';
import env from './config/environment';

// Load environment variables
dotenv.config();

const scraperService = new ScraperService();

// Schedule scraping every hour
schedule.scheduleJob('0 * * * *', async () => {
  logger.info('Starting scheduled scraping...');
  try {
    await scraperService.scrapeAll();
    logger.info('Scheduled scraping completed successfully');
  } catch (error) {
    logger.error('Error during scheduled scraping:', error);
  }
});

// Start server
const PORT = env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
  
  // Run initial scraping after server starts
  setTimeout(async () => {
    logger.info('Running initial scraping...');
    try {
      await scraperService.scrapeAll();
      logger.info('Initial scraping completed');
    } catch (error) {
      logger.error('Error during initial scraping:', error);
    }
  }, 5000);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});