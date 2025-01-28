const checkRole = (roles) => {
  return (req, res, next) => {
      if (roles.includes(req.userData.role)) {
        next();   
      }
      else{
        return res.status(403).json({ message: 'Access denied!' });
      }
  };
};

module.exports = { checkRole };
