const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect to DB
connectDB();

// Init middleware
// this will allow us to get data from req.body
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listening on port', `${PORT}`));
