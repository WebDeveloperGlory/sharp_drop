const { error } = require('../utils/responseUtils');

const uploadErrorHandler = (err, req, res, next) => {
  // Handle Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return error(res, 'File too large. Max 50MB allowed', 413);
  }
  
  if (err.code === 'LIMIT_FILE_TYPE') {
    return error(res, err.message, 400); // Our custom file filter error
  }

  // Handle other Multer errors
  if (err instanceof multer.MulterError) {
    return error(res, 'File upload error', 400);
  }

  // Handle generic errors
  if (err) {
    return error(res, 'Server error during file upload', 500);
  }

  // No errors? Continue to next middleware
  next();
};

module.exports = uploadErrorHandler;