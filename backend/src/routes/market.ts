import { Router } from 'express';
import { MarketService } from '../services/marketService';
import { logger } from '../config/logger';

const router = Router();
const marketService = new MarketService();

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
    const marketData = await marketService.getMarketData(limit);
    res.json({ data: marketData, success: true });
  } catch (error) {
    logger.error('Error fetching market data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await marketService.getMarketStats();
    res.json({ data: stats, success: true });
  } catch (error) {
    logger.error('Error fetching market stats:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/gainers', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const gainers = await marketService.getTopGainers(limit);
    res.json({ data: gainers, success: true });
  } catch (error) {
    logger.error('Error fetching top gainers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/losers', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const losers = await marketService.getTopLosers(limit);
    res.json({ data: losers, success: true });
  } catch (error) {
    logger.error('Error fetching top losers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const marketData = await marketService.getMarketDataBySymbol(symbol);
    
    if (!marketData) {
      return res.status(404).json({ success: false, message: 'Market data not found' });
    }
    
    res.json({ data: marketData, success: true });
  } catch (error) {
    logger.error('Error fetching market data by symbol:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;