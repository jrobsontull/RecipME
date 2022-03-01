import express from 'express';
import cors from 'cors';
import recipes from './routes/recipes.route.js';
import auth from './routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/user', auth);

// Serve static files if production mode
if (process.env.NODE_ENV === 'production') {
  // Serve react app files
  app.use(express.static('../frontend/build'));
  // All other GET requests not handled before will return the app
  app.get('*', (req, res) => {
    res.sendFile('../frontend/build/');
  });
}

// If page doesn't exist
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
