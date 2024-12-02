import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';

// ... other imports ...

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/auth', authRoutes);



// ... other routes and middleware ...

export default app; 