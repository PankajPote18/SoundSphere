const express = require('express');
const audioController = require('../controllers/audioController');

const router = express.Router();

router.route('/')
  .get(audioController.getAllAudios)
  .post(audioController.createAudio);

router.route('/:id')
  .get(audioController.getAudio)
  .put(audioController.updateAudio)
  .delete(audioController.deleteAudio);

module.exports = router;
