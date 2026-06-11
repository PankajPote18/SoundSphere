const { SettingsPage } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getAllPages = catchAsync(async (req, res, next) => {
  const pages = await SettingsPage.findAll();
  res.status(200).json(pages);
});

exports.getPageById = catchAsync(async (req, res, next) => {
  const page = await SettingsPage.findByPk(req.params.id);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.status(200).json(page);
});

exports.getPageBySlug = catchAsync(async (req, res, next) => {
  const page = await SettingsPage.findOne({ where: { slug: req.params.slug } });
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.status(200).json(page);
});

exports.createPage = catchAsync(async (req, res, next) => {
  const newPage = await SettingsPage.create(req.body);
  res.status(201).json(newPage);
});

exports.updatePage = catchAsync(async (req, res, next) => {
  const page = await SettingsPage.findByPk(req.params.id);
  if (!page) return res.status(404).json({ error: 'Page not found' });

  await page.update(req.body);
  res.status(200).json(page);
});

exports.deletePage = catchAsync(async (req, res, next) => {
  const page = await SettingsPage.findByPk(req.params.id);
  if (!page) return res.status(404).json({ error: 'Page not found' });

  await page.destroy();
  res.status(204).json(null);
});
