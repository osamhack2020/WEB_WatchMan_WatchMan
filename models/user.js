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
        gender: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        phonenumber: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        permission: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, 
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
));