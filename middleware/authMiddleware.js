const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Mitali123';

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'User is not authenticated!' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token!' });
    }
};

module.exports = authenticate;
