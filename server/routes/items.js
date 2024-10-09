const express = require("express");
const router = express.Router();
const { Item } = require("../models");
const { check, matchedData, validationResult } = require("express-validator");
const {Op} = require("sequelize");

// GET api/item/search?q=
router.get("/search", async (req, res) => {
	const searchQuery = req.query.q;
	if (!searchQuery) {
		return res.status(400).json({ error: "Search query is required" });
	}
	try {
		const items = await Item.findAll({
			where: {
				[Op.or]: [
					{ name: { [Op.like]: `%${searchQuery}%` } },
					{ description: { [Op.like]: `%${searchQuery}%` } },
				],
			},
		});
		res.json(items);

	} catch (error) {
		console.error("Error fetching items:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// GET /item/ all items
router.get("/", async (req, res, next) => {
	try {
		const items = await Item.findAll();
		res.status(200).json(items);
	} catch (error) {
		next(error);
		res.status(404).send("No Items Found!");
	}
});
// GET /item/:id/  single item
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const item = await Item.findByPk(id);
		res.status(200).json(item);
	} catch (error) {
		next(error);
		res.status(404).send("Item Does Not Exist!")
	}
});
//POST /item/
router.post(
	"/",
	[
		check("name").trim().notEmpty(),
		check("price").isNumeric(),
		check("description").trim().notEmpty(),
		check("category").trim().notEmpty(),
		check("image").trim().notEmpty(),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const data = matchedData(req)
			const item = await Item.create(data);
			res.status(200).json(item);
		} catch (error) {
			next(error);
			res.status(404).send("Item Cant Be Added!");
		}
	}
);
//DELETE /item/:id
router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		let item = await Item.findByPk(id);
		item = await item.destroy();
		res.status(200).json(item);
	} catch (error) {
		next(error);
		res.status(404).send("Item Does Not Exist!");
	}
});
//UPDATE/PUT /item/
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let item = await Item.findByPk(id);
		item = await item.update(req.body);
		res.status(200).json(item);
	} catch (error) {
		next(error);
		res.status(404).send("Item Does Not Exist!");
	}
});

module.exports = router;
