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
//POST /item/
router.post("/", async (req, res, next) => {
	try {
		const {body} = req
		const item = await Item.create(body);
		res.json(item);
	} catch (error) {
		next(error);
	}
});
//DELETE /item/:id
router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		let item = await Item.findByPk(id);
		item = await item.destroy()
		res.json(item);
	} catch (error) {
		next(error);
	}
});
//UPDATE/PUT /item/
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let item = await Item.findByPk(id);
		item = await item.update(req.body);
		res.json(item);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
