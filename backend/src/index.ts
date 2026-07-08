import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

let dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bioflux_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

if (process.env.DATABASE_URL) {
  const databaseUrlObject = new URL(process.env.DATABASE_URL);
  dbConfig = {
    ...dbConfig,
    host: databaseUrlObject.hostname,
    port: Number(databaseUrlObject.port) || 3306,
    user: databaseUrlObject.username,
    password: databaseUrlObject.password,
    database: databaseUrlObject.pathname?.slice(1) || process.env.DB_NAME || 'bioflux_db',
  };
}

const pool = createPool(dbConfig);

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'BioFlux Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      test: 'GET /api/test',
      researchers: 'GET /api/researchers',
    },
  });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'BioFlux Backend API is running' });
});

// Description endpoint used by the frontend
app.get('/api/description', (req: Request, res: Response) => {
  res.json({
    title: 'BioFlux',
    description: 'BioFlux connects a React frontend with an Express backend API to display research project data and descriptions.',
  });
});

// Sample database endpoint
app.get('/api/researchers', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, institution, created_at FROM researchers ORDER BY created_at DESC LIMIT 50'
    );
    res.json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
