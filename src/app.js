import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
mongoose.connect(connectionString);
const db = mongoose.connection;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
  return res.status(200).send({
    message: 'welcome to our book store'
  });
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});
