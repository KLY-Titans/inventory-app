const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /item/ all items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();

    res.json(items);
  } catch (error) {
    next(error);
  }
});
// GET /item/:id/  single item
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
