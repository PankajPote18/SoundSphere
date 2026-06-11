const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Initialize app
const app = express();

// Global Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // allows serving static images
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
const authRoutes = require('./routes/auth.routes');
const audioRoutes = require('./routes/audio.routes');
const categoryRoutes = require('./routes/category.routes');
const planRoutes = require('./routes/plan.routes');
const menuRoutes = require('./routes/menu.routes');
const pageRoutes = require('./routes/page.routes');

app.use('/api/auth', authRoutes);
app.use('/api/audios', audioRoutes);
app.use('/api/audio-categories', categoryRoutes);
app.use('/api/subscription-plans', planRoutes);
app.use('/api/settings-menu', menuRoutes);
app.use('/api/settings-pages', pageRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'SoundSphere API is running' });
});

// Handle 404
app.all('*', (req, res) => {
  res.status(404).json({ error: `Cannot find ${req.originalUrl} on this server!` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
