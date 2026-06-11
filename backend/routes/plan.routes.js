const express = require('express');
const planController = require('../controllers/planController');

const router = express.Router();

router.route('/')
  .get(planController.getAllPlans)
  .post(planController.createPlan);

router.route('/:id')
  .get(planController.getPlan)
  .put(planController.updatePlan)
  .delete(planController.deletePlan);

router.patch('/:id/toggle', planController.togglePlan);

module.exports = router;
