module.exports = function( sequelize, DataTypes ) {
    const Review = sequelize.define( 'Review', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        }
    });

    Review.associate = function( models ) {
        // Add associations here
        Review.belongsTo( models.User );
    };

    return Review;
};