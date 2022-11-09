'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PendingMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PendingMatch.init({
    userId: DataTypes.STRING,
    socketId: DataTypes.STRING,
    diffInt: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PendingMatch',
  });
  return PendingMatch;
};
