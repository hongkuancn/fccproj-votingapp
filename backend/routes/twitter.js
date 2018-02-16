import express from 'express';
import passport from 'passport';
import cors from 'cors';

const Router = express.Router();

Router.get('/', passport.authenticate('google', { scope: ['profile'] }));

Router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.send(req.user)
  // res.redirect('http://localhost:3000')
})

export default Router;
