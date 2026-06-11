const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const AudioCategory = require('./AudioCategory')(sequelize, DataTypes);
const Audio = require('./Audio')(sequelize, DataTypes);
const SettingsMenu = require('./SettingsMenu')(sequelize, DataTypes);
const SettingsPage = require('./SettingsPage')(sequelize, DataTypes);
const SubscriptionPlan = require('./SubscriptionPlan')(sequelize, DataTypes);

// Associations
AudioCategory.hasMany(Audio, { foreignKey: 'audio_category_id' });
Audio.belongsTo(AudioCategory, { foreignKey: 'audio_category_id' });

module.exports = {
  sequelize,
  User,
  AudioCategory,
  Audio,
  SettingsMenu,
  SettingsPage,
  SubscriptionPlan,
};
