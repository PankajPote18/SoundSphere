const { SubscriptionPlan } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getAllPlans = catchAsync(async (req, res, next) => {
  const query = {};
  if (req.query.active === '1') {
    query.status = true;
  }
  
  const plans = await SubscriptionPlan.findAll({
    where: query,
    order: [['sort_order', 'ASC']]
  });
  
  res.status(200).json(plans);
});

exports.getPlan = catchAsync(async (req, res, next) => {
  const plan = await SubscriptionPlan.findByPk(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.status(200).json(plan);
});

exports.createPlan = catchAsync(async (req, res, next) => {
  const newPlan = await SubscriptionPlan.create(req.body);
  res.status(201).json(newPlan);
});

exports.updatePlan = catchAsync(async (req, res, next) => {
  const plan = await SubscriptionPlan.findByPk(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  await plan.update(req.body);
  res.status(200).json(plan);
});

exports.deletePlan = catchAsync(async (req, res, next) => {
  const plan = await SubscriptionPlan.findByPk(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  await plan.destroy();
  res.status(204).json(null);
});

exports.togglePlan = catchAsync(async (req, res, next) => {
  const plan = await SubscriptionPlan.findByPk(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  await plan.update({ status: !plan.status });
  res.status(200).json(plan);
});
