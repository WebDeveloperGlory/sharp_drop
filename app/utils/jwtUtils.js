const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const secretKey = JWT_SECRET;

const generateToken = ( user ) => {
    const { _id, email, role } = user;
    const maxAge = 366 * 24 * 60 * 60;

    return jwt.sign({
        userId: _id,
        email,
        role
    }, secretKey, { 
        expiresIn: maxAge 
    });
}

function verifyToken( token ) {
    try {
        return jwt.verify( token, secretKey );        
    } catch ( err ) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };