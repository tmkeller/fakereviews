module.exports = function( sequelize, DataTypes ) {
    const User = sequelize.define( 'User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    });

    User.associate = function( models ) {
        // Add associations here
        User.hasMany( models.Review );
    };

    return User;
}