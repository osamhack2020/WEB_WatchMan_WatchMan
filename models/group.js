module.exports = ((sequelize, DataTypes) => (
    sequelize.define('group', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        leader: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        member: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        permit: {
            type: DataTypes.STRING(40),
        },
        set1: {
            type: DataTypes.STRING(40),
        },
        set1_day: {
            type: DataTypes.INTEGER(10),
        },
        set1_time: {
            type: DataTypes.INTEGER(10),
        },
        set2: {
            type: DataTypes.STRING(40),
        },
        set2_day: {
            type: DataTypes.INTEGER(10),
        },
        set2_time: {
            type: DataTypes.INTEGER(10),
        },
        set3: {
            type: DataTypes.STRING(40),
        },
        set3_day: {
            type: DataTypes.INTEGER(10),
        },
        set3_time: {
            type: DataTypes.INTEGER(10),
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
));