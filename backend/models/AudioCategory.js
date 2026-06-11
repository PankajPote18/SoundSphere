module.exports = (sequelize, DataTypes) => {
  const AudioCategory = sequelize.define('AudioCategory', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'audio_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return AudioCategory;
};
