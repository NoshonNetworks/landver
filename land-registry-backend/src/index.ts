import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { landRoutes } from './routes/landRoutes';
import { inspectorRoutes } from './routes/inspectorRoutes';
import { listingRoutes } from './routes/listingRoutes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// // Routes
// app.use('/api/lands', landRoutes);
// app.use('/api/inspectors', inspectorRoutes);
// app.use('/api/listings', listingRoutes);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
}); 