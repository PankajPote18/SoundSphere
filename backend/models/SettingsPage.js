module.exports = (sequelize, DataTypes) => {
  const SettingsPage = sequelize.define('SettingsPage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    short_description: { type: DataTypes.TEXT, allowNull: true },
    full_content: { type: DataTypes.TEXT('long'), allowNull: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'settings_pages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return SettingsPage;
};
