import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import validateSignupInput from '../src/validators/signup';

const app = express();
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
// const dbURL = "mongodb://localhost/votingapp";
const dbURL = "mongodb://user:user123@ds125388.mlab.com:25388/hk_votingapp";

mongoose.connect(dbURL, () => {
  console.log("connected to mongodb");

  app.post('/api/signup', (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);
    if(isValid){

    } else {
      res.json({ errors })
    }
  })

  app.listen(8080, () => {
    console.log("Server is running on port:8080")
  })

})
