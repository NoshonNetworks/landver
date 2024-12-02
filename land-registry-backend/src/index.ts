import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

// Error handling
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
}); 