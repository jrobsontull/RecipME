import express from 'express';
import cors from 'cors';
import recipes from './routes/recipes.route.js';
import auth from './routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use production build if mode set
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
}

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/user', auth);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
