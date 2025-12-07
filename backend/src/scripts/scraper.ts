import dotenv from 'dotenv';
import { ScraperService } from '../services/scraper';
import { logger } from '../config/logger';

dotenv.config();

async function runScraper() {
  const scraperService = new ScraperService();
  
  try {
    logger.info('Running scraper manually...');
    await scraperService.scrapeAll();
    logger.info('Scraper completed successfully');
  } catch (error) {
    logger.error('Scraper failed:', error);
    process.exit(1);
  }
}

runScraper();