import express from 'express'
import connectDB from './config/db'
import dotenv from 'dotenv'
import sessionRoutes from './routes/sessionRoutes';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', sessionRoutes);

app.listen(port, () => console.log(`server started on port ${port}`));

export default app;
