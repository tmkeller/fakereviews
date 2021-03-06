const express = require( 'express' );
const session = require( 'express-session' );
// Sets up the Express App,
const app = express();
const PORT = process.env.PORT || 8080;
require( "dotenv" ).config();

// Requiring our models for syncing
const db = require( './models');

// Sets up the Express app to handle data parsing
app.use( express.urlencoded( { extended: true } ));
app.use( express.json());

app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Should be false for local environment.
                      // We can't serve HTTPS over localhost.
        maxAge: 1000*60*60*2 // Milliseconds, seconds, minutes, hours
    }
}));

// Static directory
app.use( express.static( 'public' ));

const exphbs = require( 'express-handlebars' );
app.engine( 'handlebars', exphbs( { defaultLayout: 'main' }));
app.set( 'view engine', 'handlebars' );

const userRoutes = require( "./controllers/userController" );
app.use( userRoutes );
const frontEndRoutes = require( "./controllers/frontEndController" );
app.use( frontEndRoutes );

const reviewRoutes = require( "./controllers/reviewController" );
// Tells the server to prefix every route in the ./controllers/reviewController
// file with /api/reviews.
app.use( "/api/reviews", reviewRoutes );

// force property of this object controls whether the database 
// is deleted every time we restart the server.
db.sequelize.sync( { force: false }).then( function() {
    app.listen( PORT, function() {
        console.log( 'App listening on PORT ' + PORT );
    });
});