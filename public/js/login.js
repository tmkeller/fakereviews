$( '#login' ).submit( event => {
    event.preventDefault();
    $.post( "/login", {
        username: $('#username' ).val(),
        password: $( '#password' ).val()

    }).then( data => {
        console.log( "Logged in!" );
        window.location.href = "/";
    }).fail( err => {
        console.log( "Login failed" );
        console.log( err );
        alert( "Login failed!" );
    })
});

$( '#signup' ).submit( event => {
    event.preventDefault();
    $.post( "/signup", {
        username: $('#username' ).val(),
        password: $( '#password' ).val()

    }).then( data => {
        console.log( "Signed up!" );
        window.location.href = "/";
    }).fail( err => {
        console.log( "Signup failed. =( " );
        console.log( err );
        alert( "Signup failed." );
    })
});

$( '#addreview' ).submit( event => {
    event.preventDefault();
    $.post( "/api/reviews", {
        title: $( '#title' ).val(),
        review: $( '#review' ).val(),
        score: $( '#score' ).val(),
    }).then( data => {
        console.log( "Review added!" );
        window.location.href = "/";
    }).fail( err => {
        alert( "There was an error." );
    })
});