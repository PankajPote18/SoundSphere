module.exports = (sequelize, DataTypes) => {
  const SettingsMenu = sequelize.define('SettingsMenu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    icon_key: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: true },
    is_highlight: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_logout: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'settings_menu',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return SettingsMenu;
};
