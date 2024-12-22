import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();


router.get('/api/products/:category', async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    let filename;

    switch (category) {
      case 'laptop':
        filename = 'laptopfilpkat.json';
        break;
      case 'mobile':
        filename = 'mobile.json';
        break;
      case 'washingmachine':
        filename = 'washingmachine.json';
        break;
      default:
        return res.status(404).json({ error: 'Category not found' });
    }

    const filePath = join(__dirname, '..', '..', 'public', filename);
    console.log('Reading products from:', filePath);

    const fileData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileData);

    res.json(products);
  } catch (error) {
    console.error('Error in /api/products/:category:', error);
    res.status(500).json({ error: error.message });
  }
});

// MIDDLE WARE WOKING 
router.get('/test', (req, res) => {
  res.json({ message: 'Price comparison API is working' });
});

export default router;
