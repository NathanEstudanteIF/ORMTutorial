export default function (sequelize, DataTypes) {
    return sequelize.define('tutorial', {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    })
}