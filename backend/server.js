const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
const favoriteRoutes = require('./routes/Favouriteroute');
app.use('/api/favorites', favoriteRoutes);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/randommeal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
