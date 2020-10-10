module.exports = ((sequelize, DataTypes) => (
    sequelize.define('user', {
        userid: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
));