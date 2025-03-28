// Dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/api/auth';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URI, // Allow requests from the frontend development server
  methods: ['GET', 'POST'], // Allow only GET and POST methods
  credentials: true // Allow credentials (like cookies) to be included in requests
}));

app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});