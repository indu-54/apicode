// // middleware/authenticate.js

// const jwt = require('jsonwebtoken');

// function authenticate(req, res, next) {
//     // Get token from request header
//     const token = req.header('Authorization');

//     // Check if token is present
//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, 'your_secret_key');
//         req.user = decoded;
//         next(); // Proceed to the next middleware
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Invalid token.' });
//     }
// }

// module.exports = authenticate;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "webBatch");
        req.userData = decode;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Auth failed: Invalid token" });
    }
};

