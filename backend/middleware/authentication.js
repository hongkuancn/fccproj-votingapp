import jwt from 'jsonwebtoken';
import User from '../models/user';
import jwtDecode from 'jwt-decode';

export default (req, res, next) => {
  const autoken = req.get('Auth-Token');
  let token;
  if(autoken){
    token = autoken.split(' ')[1];
  }

  if (token){
    jwt.verify(token, 'keyforjwt', (err, decoded) => {
      const { id } = decoded;
      User.findOne({ _id: id }, (err, user) => {
        if (err){
          res.status(401).json({ error: 'Failed to authenticate' });
        };
        if (user) {
          req.id = id;
          next();
        } else {
          res.status(401).json({ error: 'No such user!' });
        }
      });
    })
    } else {
      res.status(401).json({ error: 'No token provided!' });
    }
  }
