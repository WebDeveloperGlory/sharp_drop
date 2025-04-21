const db = require('../config/db');
const { generateToken } = require('../utils/jwtUtils');

exports.registerUser = async ({ firstName, lastName, email, number, password }) => {
    // Check if required fields passed in
    if( !firstName || !lastName || !email || !number || !password ) return { success: false, message: 'Missing Required Fields' }
    
    // Check if user exists
    const foundUser = await db.User.findOne({ email });
    if( foundUser ) return { success: false, message: 'User With Email Already Exists' }

    // Create user
    const createdUser = await db.User.create({ firstName, lastName, email, number, password });
    if( !createdUser ) return { success: false, message: 'Error Creating User' };

    // Grab fields
    const registeredUser = {
        id: createdUser._id,
        firstName, lastName, email, number,
        role: createdUser.role
    }
    
    // Return success
    return { success: true, message: 'User Registered', data: registeredUser };
}

exports.registerAdmin = async ({ firstName, lastName, email, number, password }) => {
    // Check if required fields passed in
    if( !firstName || !lastName || !email || !number || !password ) return { success: false, message: 'Missing Required Fields' }
    
    // Check if unique fields exists
    const foundUserWithEmail = await db.User.findOne({ email });
    if( foundUserWithEmail ) return { success: false, message: 'User With Email Already Exists' };
    const foundUserWithNumber = await db.User.findOne({ number });
    if( foundUserWithNumber ) return { success: false, message: 'User With Number Already Exists' };

    // Create user
    const createdAdmin = await db.User.create({ 
        firstName, lastName, email, number, password,
        role: 'admin'
    });
    if( !createdAdmin ) return { success: false, message: 'Error Creating Admin' };

    // Grab fields
    const registeredAdmin = {
        firstName, lastName, email, number,
        role: createdAdmin.role
    }
    
    // Return success
    return { success: true, message: 'Admin Registered', data: registeredAdmin };
}

exports.registerSuperAdmin = async ({ firstName, lastName, email, number, password }) => {
    // Check if required fields passed in
    if( !firstName || !lastName || !email || !number || !password ) return { success: false, message: 'Missing Required Fields' }

    // Check if unique fields exists
    const foundUserWithEmail = await db.User.findOne({ email });
    if( foundUserWithEmail ) return { success: false, message: 'User With Email Already Exists' };
    const foundUserWithNumber = await db.User.findOne({ number });
    if( foundUserWithNumber ) return { success: false, message: 'User With Number Already Exists' };

    // Create user
    const createdAdmin = await db.User.create({ 
        firstName, lastName, email, number, password,
        role: 'superAdmin'
    });
    if( !createdAdmin ) return { success: false, message: 'Error Creating Admin' };

    // Grab fields
    const registeredAdmin = {
        firstName, lastName, email, number,
        role: createdAdmin.role
    }
    
    // Return success
    return { success: true, message: 'Super Admin Registered', data: registeredAdmin };
}

exports.setSecurityPin = async ({ securityPin, userId }) => {
    // Check securityPin
    if( securityPin.length !== 6 ) return { success: false, message: 'Security Pin Must Be 6 Digits Long' };

    // Check if user exists
    const foundUser = await db.User.findById( userId );
    if( !foundUser ) return { success: false, message: 'Invalid User' };

    // Save security pin
    foundUser.securityPin = securityPin;
    await foundUser.save();

    // Return success
    return { success: true, message: 'Security Pin Set', data: securityPin };
}

exports.loginUser = async ({ email, number, password }) => {
    // Check if user exists
    const foundUser = await db.User.findOne({
        $or: [
            { email },
            { number }
        ]
    });
    if( !foundUser ) return { success: false, message: 'Invalid Email/Number' };
    if( foundUser.role !== 'user' ) return { success: false, message: 'Invalid User' }

    // Check if password is coreect
    const isPasswordMatch = await foundUser.comparePassword( password );
    if( !isPasswordMatch ) return { success: false, message: 'Invalid Password' };

    // Set user as online
    foundUser.isOnline = true;
    await foundUser.save();

    // Generate jwt
    const token = generateToken( foundUser );

    // Return success
    return { success: true, message: 'User Logged In', data: token };
}

exports.loginAdmin = async ({ email, number, password }) => {
    // Check if user exists
    const foundUser = await db.User.findOne({
        $or: [
            { email },
            { number }
        ]
    });
    if( !foundUser ) return { success: false, message: 'Invalid Email/Number' };
    if( foundUser.role === 'user' ) return { success: false, message: 'Invalid Admin' }

    // Check if password is coreect
    const isPasswordMatch = await foundUser.comparePassword( password );
    if( !isPasswordMatch ) return { success: false, message: 'Invalid Password' };

    // Set user as online
    foundUser.isOnline = true;
    await foundUser.save();

    // Generate jwt
    const token = generateToken( foundUser );

    // Return success
    return { success: true, message: 'Admin Logged In', data: token };
}

exports.logoutUser = async ({ userId }) => {
    // Check if user exists
    const foundUser = await db.User.findById( userId ).select('-password -securityPin');
    if( !foundUser ) return { success: false, message: 'Invalid User' }

    // Update online status
    foundUser.isOnline = false;
    foundUser.lastSeen = Date.now();
    await foundUser.save();

    // Return success
    return { success: true, message: 'User Logged Out', data: null }
}

module.exports = exports;