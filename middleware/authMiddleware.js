// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: 'User is not authenticated!' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.userData = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid or expired token!' });
//     }
// };

// module.exports = authenticate;

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authorizationHeader = req.header("Authorization");

        if (!authorizationHeader) {
            return res.status(401).json({ message: "Authorization header missing, authentication denied" });
        }

        // Ensure the token starts with 'Bearer'
        if (!authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid token format, authentication denied" });
        }

        const token = authorizationHeader.replace("Bearer ", "");

        // Verify the token and extract the payload
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the decoded object has the id property
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token structure, 'id' not found" });
        }

        // Find the user in the database based on the decoded id
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found, authentication denied" });
        }

        // Attach the user object to the request for further use
        req.userData = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        res.status(401).json({ message: "Invalid or expired token, authentication denied" });
    }
};

module.exports = authenticate;
