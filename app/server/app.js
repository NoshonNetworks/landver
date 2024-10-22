// const cors = require('cors');
// const landRoutes = require('./routes/landRoutes');

// //Animationllowed origins
// const allowedOrigins = ['https://landver01.onrender.com', 'https://landver.vercel.app', 'http://localhost:3000'];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (e.g., mobile apps, curl requests)
//       if (!origin) return callback(null, true);

//       // Check if the origin is allowed
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }

//       // If the origin is in the allowed list, accept the request
//       return callback(null, true);
//     },
//     credentials: true,
//   })
// );

// app.use('/api/land', landRoutes);
