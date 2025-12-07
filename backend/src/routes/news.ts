import { Router } from 'express';
import { NewsService } from '../services/newsService';
import { logger } from '../config/logger';

const router = Router();
const newsService = new NewsService();

router.get('/', async (req, res) => {
  try {
    const { page, limit, category, chain, project, person, date, tags } = req.query;
    
    const filters = {
      category: category as string,
      chain: chain as string,
      project: project as string,
      person: person as string,
      date: date as string,
      tags: tags ? (tags as string).split(',') : undefined,
    };
    
    const pagination = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    };
    
    const result = await newsService.getNews(filters, pagination);
    res.json(result);
  } catch (error) {
    logger.error('Error fetching news:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/headlines', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const headlines = await newsService.getHeadlines(limit);
    res.json({ data: headlines, success: true });
  } catch (error) {
    logger.error('Error fetching headlines:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await newsService.getCategories();
    res.json({ data: categories, success: true });
  } catch (error) {
    logger.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/chains', async (req, res) => {
  try {
    const chains = await newsService.getChains();
    res.json({ data: chains, success: true });
  } catch (error) {
    logger.error('Error fetching chains:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsService.getNewsById(id);
    
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }
    
    res.json({ data: news, success: true });
  } catch (error) {
    logger.error('Error fetching news by ID:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;