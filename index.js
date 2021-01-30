const express = require( 'express' );
// Sets up the Express App,
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require( './models');

// Sets up the Express app to handle data parsing
app.use( express.urlencoded( { extended: true } ));
app.use( express.json());

// Static directory
app.use( express.static( 'public' ));

const exphbs = require( 'express-handlebars' );
app.engine( 'handlebars', exphbs( { defaultLayout: 'main' }));
app.set( 'view engine', 'handlebars' );

app.get( '/', ( req, res ) => {
    res.send( "stuff" );
});

const userRoutes = require( "./controllers/userController" );
app.use( userRoutes );

db.sequelize.sync( { force: true }).then( function() {
    app.listen( PORT, function() {
        console.log( 'App listening on PORT ' + PORT );
    });
});