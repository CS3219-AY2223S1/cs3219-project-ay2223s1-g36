'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Match.init({
    roomId: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    user1Id: DataTypes.STRING,
    user2Id: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    ongoing: DataTypes.BOOLEAN  // if ongoing, True, if ended, false
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};