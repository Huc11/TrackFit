import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token); // Helpful for debugging token flow

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Combine both ideas: attach entire user object but fallback to ID if needed
    req.user = decoded.user || { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default authenticate;
