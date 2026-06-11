const { SettingsMenu } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getAllMenu = catchAsync(async (req, res, next) => {
  const query = {};
  if (req.query.active === '1') {
    query.status = true;
  }
  
  const menus = await SettingsMenu.findAll({
    where: query,
    order: [['sort_order', 'ASC']]
  });
  
  res.status(200).json(menus);
});

exports.getMenu = catchAsync(async (req, res, next) => {
  const menu = await SettingsMenu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ error: 'Menu not found' });
  res.status(200).json(menu);
});

exports.createMenu = catchAsync(async (req, res, next) => {
  const newMenu = await SettingsMenu.create(req.body);
  res.status(201).json(newMenu);
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const menu = await SettingsMenu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ error: 'Menu not found' });

  await menu.update(req.body);
  res.status(200).json(menu);
});

exports.deleteMenu = catchAsync(async (req, res, next) => {
  const menu = await SettingsMenu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ error: 'Menu not found' });

  await menu.destroy();
  res.status(204).json(null);
});

exports.reorderMenu = catchAsync(async (req, res, next) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid items array' });
  }

  // Sequelize doesn't have a simple bulk update for disparate values out of the box,
  // so we'll do it sequentially in a Promise.all
  await Promise.all(items.map(item => 
    SettingsMenu.update({ sort_order: item.sort_order }, { where: { id: item.id } })
  ));

  res.status(200).json({ status: 'success', message: 'Reordered successfully' });
});
