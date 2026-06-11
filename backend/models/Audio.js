module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audio_category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImage: { type: DataTypes.STRING, allowNull: true },
    bannerImage: { type: DataTypes.STRING, allowNull: true },
    popularityScore: { type: DataTypes.DECIMAL(3, 1), defaultValue: 0.0 },
    releaseYear: { type: DataTypes.INTEGER, allowNull: true },
    duration: { type: DataTypes.STRING, allowNull: true },
    genres: { type: DataTypes.JSON, allowNull: true },
    artist: { type: DataTypes.STRING, allowNull: true },
    artists: { type: DataTypes.JSON, allowNull: true },
    album: { type: DataTypes.STRING, allowNull: true },
    trackCount: { type: DataTypes.INTEGER, defaultValue: 1 },
    audioUrl: { type: DataTypes.STRING, allowNull: true },
    waveformUrl: { type: DataTypes.STRING, allowNull: true },
    language: { type: DataTypes.STRING, defaultValue: 'English' },
    playCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    newRelease: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    isTrending: { type: DataTypes.BOOLEAN, defaultValue: false },
    isOriginal: { type: DataTypes.BOOLEAN, defaultValue: false },
    episodes: { type: DataTypes.JSON, allowNull: true }
  }, {
    tableName: 'audios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Audio;
};
