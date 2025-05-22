const express = require('express');
const app = express();
const cors = require("cors");
const apiRoutes = require('./app/routes/apiRoutes');
const allowedOrigins = require('./app/config/allowedOrigins');

// Middleware
app.use(express.json());

// Cross Origin Resource Sharing
app.use(cors(allowedOrigins)); // Allow all origins

// Routes
app.use('/api', apiRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
