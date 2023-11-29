'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.Spot, {
        foreignKey: 'spotId'
      });
      Booking.belongsTo(
        models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: this.startDate
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};