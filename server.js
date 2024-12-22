import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import priceComparisonApi from './src/server/priceComparisonApi.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Basic CORS setup
app.use(cors());

// Basic middleware
app.use(express.json());
app.use(express.static('public'));

// Debug logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Price comparison API
app.use('/api', priceComparisonApi);

// Product data endpoint
app.get('/api/products/:category', async (req, res) => {
    try {
        const { category } = req.params;
        let filename;
        
        switch(category) {
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
        
        const filePath = path.join(__dirname, 'public', filename);
        const data = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(data);
        
        res.json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
