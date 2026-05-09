import express from 'express';
import cors from 'cors';
import roastRouter from './routes/roast.js';
import destinyRouter from './routes/destiny.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/roast', roastRouter);
app.use('/api/destiny', destinyRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Cyber Fortune API is running...' });
});

app.listen(PORT, () => {
  console.log(`🔥 Cyber Fortune Backend running on port ${PORT}`);
});