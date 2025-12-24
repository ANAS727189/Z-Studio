import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(morgan("dev")); 
app.use(express.json());

// Health check endpoint
app.get('/health-123', (req, res) => {
    res.json({ status: 'ok' });
});

import zlangRoutes from './routes/z-lang.routes.js';
import judge0Routes from './routes/judge0.routes.js';

app.use('/api/zlang', zlangRoutes);
app.use('/api/judge0', judge0Routes);


// Route not found
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
      res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal Server Error',
      logs: err.logs || '',
      suggestions: err.suggestions || '',
  });
});

export {app};