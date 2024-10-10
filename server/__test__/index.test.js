const request = require("supertest");
const express = require("express");
const { Item } = require("../models");



const app = express();
app.use(express.json());
app.use("/item", require("../routes/items"));


jest.mock("../models", () => ({
	Item: {
		findAll: jest.fn(),
		findByPk: jest.fn(),
		create: jest.fn(),
		destroy: jest.fn(),
		update: jest.fn(),
	},
}));

describe("Item API routes", () => {
	// Test for GET /item/ (all items)
	it("should return all items", async () => {
		const mockItems = [
			{
				name: "Test Item 1",
				price: 100,
				description: "Test item 1",
				category: "Category 1",
				image: "image1.jpg",
			},
			{
				name: "Test Item 2",
				price: 200,
				description: "Test item 2",
				category: "Category 2",
				image: "image2.jpg",
			},
		];

		// Mocking findAll to return mockItems
		Item.findAll.mockResolvedValue(mockItems);

		const response = await request(app).get("/item/");
		// console.log("this is response", response);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockItems);
	});

	// Test for GET /api/item/:id (single item by ID)
	it("should return a single item by ID", async () => {
		const mockItem = {
			name: "Test Item",
			price: 100,
			description: "A test item",
			category: "Test Category",
			image: "test-image.jpg",
		};

		// Mocking findByPk to return mockItem
		Item.findByPk.mockResolvedValue(mockItem);

		const response = await request(app).get("/item/1");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockItem);
	});

	// Test for POST /api/item/ (create new item)
	it("should create a new item", async () => {
		const newItem = {
			name: "New Item",
			price: 300,
			description: "New item description",
			category: "New Category",
			image: "new-image.jpg",
		};

		// Mocking create to return newItem
		Item.create.mockResolvedValue(newItem);

		const response = await request(app).post("/item/").send(newItem);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(newItem);
	});

	// Test for DELETE /api/item/:id (delete item by ID)
	it("should delete an item by ID", async () => {
		const mockItem = {
			name: "Test Item",
			price: 100,
			description: "A test item",
			category: "Test Category",
			image: "test-image.jpg",
		};

		// Mocking findByPk and destroy
		const item = Item.findByPk.mockResolvedValue(mockItem);
		Item.destroy.mockResolvedValue(1); // Mocking destroy to return 1 (indicating one row affected)

		const response = await request(app).delete("/item/1");
		// const response = await request(app).get("/item/1");
		console.log(response)
		expect(response.status).toBe(200);
	});

	// Test for PUT /api/item/:id (update an item by ID)
	it("should update an item by ID", async () => {
		const updatedData = { name: "Updated Item", price: 150 };
		const mockItem = {
			name: "Test Item",
			price: 100,
			update: jest.fn().mockResolvedValue(updatedData),
		};

		// Mocking findByPk and update
		Item.findByPk.mockResolvedValue(mockItem);

		const response = await request(app).put("/item/1").send(updatedData);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(updatedData);
	});
});
