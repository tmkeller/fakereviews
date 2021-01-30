const express = require( 'express' );
const router = express.Router();
const db = require( '../models' );
const bcrypt = require( "bcrypt" );

router.post( "/signup", ( req, res ) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then( data => {
        res.json( data );
    }).catch( err => {
        res.status(500).json( err );
    })
});

// login route uses bcrypt to decrypt 
router.post( "/login", ( req, res ) => {
    db.User.findOne({
        where: {
            username: req.body.username
        }
    }).then( userData => {
        if ( !userData ) {
            res.status( 404 ).send( "no such user" );
        } else {
            if ( bcrypt.compareSync( req.body.password, userData.password )) {
                req.session.user = {
                    id: userData.id,
                    username: userData.username
                }
                res.json( userData );
            } else {
                res.status( 401 ).send( "wrong password" )
            }
        }
    });
});

router.get( "/readsessions", ( req, res ) => {
    req.session.isWeird = true;
    res.json( req.session );
});

router.get( "/secretclub" , ( req, res ) => {
    if ( req.session.user ) {
        res.send( `welcome to the club, ${ req.session.user.username }` );
    } else {
        res.status( 401 ).send( "log in first, doofus." );
    }
});


module.exports = router;