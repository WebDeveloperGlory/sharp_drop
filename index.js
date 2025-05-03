// STANDARD IMPORTS //
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpecV1 } = require('./app/config/swagger');
const { PORT, ALLOWED_ORIGINS } = require('./app/config/env');
const { initializeSocketService } = require('./app/services/socketService');
// END OF STANDARD IMPORTS //

// ROUTE IMPORTS //
const authRoutes = require('./app/routes/authRoutes');
const channelRoutes = require('./app/routes/channelRoutes');
const userRoutes = require('./app/routes/userRoutes');
const messageRoutes = require('./app/routes/messageRoutes');
const chatRoutes = require('./app/routes/chatRoutes');
const chatRoutesV2 = require('./app/routes/chatRoutesV2');
const orderRoutes = require('./app/routes/orderRoutes');
// END OF ROUTE IMPORTS //

// APP SETUP //
const app = express();
const APP_PORT = PORT;
const server = http.createServer( app );
// END OF APP SETUP //

// CORS SETTINGS //
const allowedOrigins = ALLOWED_ORIGINS;
const corsOptions = {
    origin: ( origin, callback ) => {
        if ( !origin || allowedOrigins.includes( origin ) ) {
            callback( null, true );
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
// END OF CORS SETTINGS //

// SOCKET.IO SETUP //
const io = socketIO(server, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST"],
        credentials: true
    }
});
initializeSocketService( io );
// END OF SOCKET.IO SETUP //

// MIDDLEWARES //
app.use( cors( corsOptions ) );
app.use( express.json() );
app.use( '/api/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerSpecV1 ) );
// END OF MIDDLEWARES //

// TEST ROUTES //
app.get( '/', ( req, res ) => {
    res.send( 'Deployed And Working with CORS for testing' );
});
// END OF TEST ROUTES //

// ROUTES //
app.use('/api/auth', authRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/chat/v2', chatRoutesV2);
app.use('/api/order', orderRoutes);
// END OF ROUTES //

// SERVER STARTUP //
server.listen( PORT, () => {
    console.log(`Sharp Drop Server Running On Port: ${ APP_PORT }`);
    console.log(`Swagger Docs Available At: ${ APP_PORT }/api/api-docs`);
    console.log(`Socket.IO server is running and ready for connections`);
});
// END OF SERVER STARTUP //