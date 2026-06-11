const { AudioCategory } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await AudioCategory.findAll();
  res.status(200).json(categories);
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await AudioCategory.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.status(200).json(category);
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await AudioCategory.create(req.body);
  res.status(201).json(newCategory);
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await AudioCategory.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });

  await category.update(req.body);
  res.status(200).json(category);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await AudioCategory.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });

  await category.destroy();
  res.status(204).json(null);
});
