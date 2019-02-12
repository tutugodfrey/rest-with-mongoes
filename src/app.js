import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';
import router from './routes';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
mongoose.connect(connectionString);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router)
app.get('/api', (req, res) => {
  return res.status(200).send({
    message: 'welcome to our book store'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on port ${port}`)
});
