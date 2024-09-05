const cors = require('cors');
const landRoutes = require('./routes/landRoutes');


app.use(cors({
  origin: ['https://landver01.onrender.com', 'http://localhost:3000'],
  credentials: true,
}));

app.use('/api/land', landRoutes);

