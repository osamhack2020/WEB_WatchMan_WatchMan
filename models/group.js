module.exports = ((sequelize, DataTypes) => (
    sequelize.define('group', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        leader: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        member: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
));