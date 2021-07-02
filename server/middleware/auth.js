const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    // eslint-disable-next-line no-undef
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    const name = error.name;
    if (name === 'TokenExpiredError') {
      const jwtError = new Error('Token Expired');
      jwtError.statusCode = 401;
      throw jwtError;
    }
    throw new Error(error);
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.isAdmin = decodedToken.isAdmin;
  next();
};
