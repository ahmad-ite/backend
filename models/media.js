module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('media', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    uuid: DataTypes.STRING,
    type: DataTypes.STRING,

  },
    {
      freezeTableName: true,
      timestamps: false

    }
  );



  return Media;
}