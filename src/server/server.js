import express from 'express';
import cors from 'cors';
import priceComparisonRoutes from './priceComparisonApi.js';

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());

// Log all 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/', priceComparisonRoutes);


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
