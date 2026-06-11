const express = require('express');
const menuController = require('../controllers/settingsMenuController');

const router = express.Router();

router.patch('/reorder', menuController.reorderMenu);

router.route('/')
  .get(menuController.getAllMenu)
  .post(menuController.createMenu);

router.route('/:id')
  .get(menuController.getMenu)
  .put(menuController.updateMenu)
  .delete(menuController.deleteMenu);

module.exports = router;
