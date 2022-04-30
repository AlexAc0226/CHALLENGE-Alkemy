const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movieSerie', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
    },
    release_date:{
        type: DataTypes.STRING,
    },
    qualification:{
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 5,
        }
    },
    image:{
        type: DataTypes.STRING,
    }
  });
};
