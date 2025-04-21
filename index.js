// STANDARD IMPORTS //
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpecV1 } = require('./app/config/swagger');
const { PORT, ALLOWED_ORIGINS } = require('./app/config/env');
// END OF STANDARD IMPORTS //

// ROUTE IMPORTS //
const authRoutes = require('./app/routes/authRoutes');
// END OF ROUTE IMPORTS //

// APP SETUP //
const app = express();
const APP_PORT = PORT;
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
// END OF ROUTES //

// SERVER STARTUP //
app.listen( PORT, () => {
    console.log(`Sharp Drop Server Running On Port: ${ APP_PORT }`);
    console.log(`Swagger Docs Available At: ${ APP_PORT }/api/api-docs`);
});
// END OF SERVER STARTUP //