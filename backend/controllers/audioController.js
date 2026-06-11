const { Audio, AudioCategory } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getAllAudios = catchAsync(async (req, res, next) => {
  const audios = await Audio.findAll({
    include: [{ model: AudioCategory }]
  });
  res.status(200).json(audios); // Match Laravel JSON structure
});

exports.getAudio = catchAsync(async (req, res, next) => {
  const audio = await Audio.findByPk(req.params.id, {
    include: [{ model: AudioCategory }]
  });
  
  if (!audio) return res.status(404).json({ error: 'Audio not found' });
  
  res.status(200).json(audio);
});

exports.createAudio = catchAsync(async (req, res, next) => {
  const newAudio = await Audio.create(req.body);
  res.status(201).json(newAudio);
});

exports.updateAudio = catchAsync(async (req, res, next) => {
  const audio = await Audio.findByPk(req.params.id);
  if (!audio) return res.status(404).json({ error: 'Audio not found' });

  await audio.update(req.body);
  res.status(200).json(audio);
});

exports.deleteAudio = catchAsync(async (req, res, next) => {
  const audio = await Audio.findByPk(req.params.id);
  if (!audio) return res.status(404).json({ error: 'Audio not found' });

  await audio.destroy();
  res.status(204).json(null);
});
