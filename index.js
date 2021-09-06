require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./server')

const port = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT;
const MONGODB_URL = process.env.MONGODB

mongoose.connect(MONGODB_URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})