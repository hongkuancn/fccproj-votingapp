import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import publicRouter from './routes/public';

const app = express();
app.use(bodyParser.json());
const dbURL = "mongodb://localhost/votingapp";
// const dbURL = "mongodb://user:user123@ds125388.mlab.com:25388/hk_votingapp";
mongoose.Promise = global.Promise;
mongoose.connect(dbURL, () => {
  console.log("connected to mongodb");
})

app.use('/api', publicRouter);

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: "Still working on it. Please try it later when we implement it"
    }
  })
})

app.listen(8080, () => {
  console.log("Server is running on port:8080")
})
