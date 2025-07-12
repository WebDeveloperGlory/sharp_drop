const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const URI = MONGO_URI;
mongoose.Promise = Promise;

mongoose.connect( URI )
    .then( ( res ) => console.log('Connected to sharp_drop db') )
    .catch( ( err ) => console.log( err ) );

module.exports.Channel = require('../models/Channel');
module.exports.Chat = require('../models/Chat');
module.exports.Message = require('../models/Message');
module.exports.Notification = require('../models/Notification');
module.exports.Order = require('../models/Order');
module.exports.User = require('../models/User');