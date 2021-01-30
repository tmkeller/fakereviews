const express = require( 'express' );
const router = express.Router();
const db = require( '../models' );

router.get( '/', ( req, res ) => {
    db.Review.findAll({
        include: [db.User]
    }).then( data => {
        // For the array returned, convert every object element to JSON.
        const jsonData = data.map( obj => obj.toJSON() );
        
        const hbsObj = {
            reviews: jsonData,
            user: req.session.user
        }
        console.log( jsonData );
        // console.log( '--------' );
        // console.log( data[0].toJSON() )
        // Any handlebars object can be converted to simple JSON
        // Using the method below.
        res.render( "index", hbsObj );
    });
});

router.get( '/login', ( req, res ) => {
    res.render( "login", {
        user: req.session.user
    });
})

router.get( '/signup', ( req, res ) => {
    res.render( "signup", {
        user: req.session.user
    });
})

router.get( '/addreview', ( req, res ) => {
    if ( !req.session.user ) {
        res.redirect( '/login' );
    } else {
        res.render( "addreview" , {
            user: req.session.user
        });
    }
})

module.exports = router;