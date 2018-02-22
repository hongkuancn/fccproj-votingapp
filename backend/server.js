import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import publicRouter from './routes/public';
import privateRouter from './routes/user';
import path from 'path';
import requestIp from 'request-ip';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
// request IP middleware
app.use(requestIp.mw());

// get reference to the client build directory
const staticFiles = express.static(path.join(__dirname, '../../build'));
// pass the static files (react app) to the express app.
app.use(staticFiles)

let dbURL;
if(process.env.NODE_ENV !== 'production'){
  dbURL = "mongodb://localhost/votingapp"
} else {
  dbURL = process.env.DB_URL;
}

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
