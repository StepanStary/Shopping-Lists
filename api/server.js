// api/server.js
const express = require('express');
const cors = require('cors');
const listRoutes = require('./routes/listRoutes');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use('/api', listRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
