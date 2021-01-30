const express = require( 'express' );
const router = express.Router();
const db = require( '../models' );

router.post( "/signup", ( req, res ) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then( data => {
        res.json( data );
    }).catch( err => {
        res.status(500).json( err );
    })
})

module.exports = router;