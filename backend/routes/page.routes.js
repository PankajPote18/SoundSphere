const express = require('express');
const pageController = require('../controllers/settingsPageController');

const router = express.Router();

router.get('/slug/:slug', pageController.getPageBySlug);

router.route('/')
  .get(pageController.getAllPages)
  .post(pageController.createPage);

router.route('/:id')
  .get(pageController.getPageById)
  .put(pageController.updatePage)
  .delete(pageController.deletePage);

module.exports = router;
