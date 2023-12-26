import User from '../models/user.js';
import { verifyToken } from '../utils/token.js';

export function attachSession(req, res, next) {

  if(!req.headers['authorization']) {
    return next();
  }

  req.session = {
    user: null,
  };
  
  try{
    const user_id = verifyToken(req.headers['authorization']).user_id

    User.findOne({
      where: {
        id: user_id,
      },
    })
    .then(user => {
      if (user?.dataValues?.id) {
        req.session.user = user.dataValues;
      }
      next();
    }).catch(err => {
      res.status(403).json({
        success: false,
        message: 'Invalid Token',
      });
    });
  } catch(error) {
    res.status(403).json({
      success: false,
      message: 'Invalid Token',
    });
  }
  
}
