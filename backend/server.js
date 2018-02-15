import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import publicRouter from './routes/public';
import privateRouter from './routes/user';
import path from 'path'

const app = express();
app.use(bodyParser.json());

// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../../build'));
// pass the static files (react app) to the express app.
app.use(staticFiles)

const dbURL = "mongodb://localhost/votingapp";
// const dbURL = "mongodb://user:user123@ds125388.mlab.com:25388/hk_votingapp";
mongoose.Promise = global.Promise;
mongoose.connect(dbURL, () => {
  console.log("connected to mongodb");
})

app.use('/api/public', publicRouter);
app.use('/api/private', privateRouter);

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: "Still working on it. Please try it later when we implement it"
    }
  })
})

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port:8080")
})
