module.exports = ((sequelize, DataTypes) => (
    sequelize.define('permit', {
        grid: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        usid: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
));