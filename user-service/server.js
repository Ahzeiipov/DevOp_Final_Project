const app = require('./app');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/user_db';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('User DB connected');
    app.listen(port, () => console.log(`User service listening ${port}`));
  }).catch(err => {
    console.error('DB connection error', err);
  });
