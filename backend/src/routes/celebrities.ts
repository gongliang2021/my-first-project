import { Router } from 'express';
import { CelebrityService } from '../services/celebrityService';
import { logger } from '../config/logger';

const router = Router();
const celebrityService = new CelebrityService();

router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    
    const pagination = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    };
    
    const result = await celebrityService.getCelebrities(pagination);
    res.json(result);
  } catch (error) {
    logger.error('Error fetching celebrities:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/trending', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const trending = await celebrityService.getTrendingCelebrities(limit);
    res.json({ data: trending, success: true });
  } catch (error) {
    logger.error('Error fetching trending celebrities:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celebrity = await celebrityService.getCelebrityById(id);
    
    if (!celebrity) {
      return res.status(404).json({ success: false, message: 'Celebrity not found' });
    }
    
    res.json({ data: celebrity, success: true });
  } catch (error) {
    logger.error('Error fetching celebrity by ID:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/:id/updates', async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;
    
    const pagination = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    };
    
    const result = await celebrityService.getCelebrityUpdates(id, pagination);
    res.json(result);
  } catch (error) {
    logger.error('Error fetching celebrity updates:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;