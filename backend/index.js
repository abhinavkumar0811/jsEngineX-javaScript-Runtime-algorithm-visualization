import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'CS Execution & Visualization API Server is running cleanly.',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
});
