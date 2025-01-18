// Generate JWT
const jwt = require("jsonwebtoken");
const generateToken = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: "5h",
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const decodeToken = (token) => {
    return jwt.decode(token, { complete: true });
};

module.exports = { generateToken, verifyToken, decodeToken };
