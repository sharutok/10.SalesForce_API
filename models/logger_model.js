'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logger_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logger_model.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    data_length: DataTypes.STRING,
    method: DataTypes.STRING,
    original_url: DataTypes.STRING,
    start_time: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'logger_model',
    tableName: 'logger_model'
  });
  return logger_model;
};