require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./server')

const port = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT;
const MONGODB_URL = process.env.MONGODB

mongoose.connect(MONGODB_URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: false },
    password: { type: String, required: true }
}, { collection: 'users' })

const User = mongoose.model('User', UserSchema);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})