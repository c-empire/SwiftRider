// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());


// // Swagger Docs
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/deliveries', deliveryRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/riders', riderRoutes);

// if (process.env.NODE_ENV !== 'test') {
//   const swaggerUi = require('swagger-ui-express');
//   const swaggerSpec = require('./config/swagger');
//   app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// }


// module.exports = app; // only export app

// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./config/swagger');

// const authRoutes = require('./routes/authRoutes');
// const deliveryRoutes = require('./routes/deliveryRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const riderRoutes = require('./routes/riderRoutes');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // Swagger Docs (always defined, safe for tests)
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/deliveries', deliveryRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/riders', riderRoutes);

// module.exports = app; // export only app for Supertest

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const riderRoutes = require('./routes/riderRoutes');

dotenv.config();
connectDB().then(() => console.log('initialization completed'));

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the SwiftRider API! Visit /api/docs for documentation.');
});

// Swagger Docs
 app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/riders', riderRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;