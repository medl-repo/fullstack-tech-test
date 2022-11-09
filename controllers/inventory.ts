import express, { Request } from "express";
import { Inventory } from "../models/Inventory";
const router = express.Router();

const iv = new Inventory();
iv.populateDB();

router.get("/inventory", async (req, res) => {
  const items = iv.getItems();
  res.send(items);
});

router.post("/inventory", async (req, res) => {
  const inventory = {
    id: Date.now(),
    productName: req.body.productName,
    price: req.body.price,
    totalQuantity: req.body.totalQuantity,
    tax: req.body.tax,
    taxPercentage: req.body.tax,
    lowStockCount: req.body.lowStockCount,
    expiryDate: req.body.expiryDate,
    createdAt: Date(),
    substituteItems: req.body.substituteItems,
    isOutOfStock: false,
  };
  iv.addItem(inventory);
  res.status(201);
  res.send(inventory);
});

router.get("/inventory/:id", async (req, res) => {
  try {
    const inventory = iv.getItem(Number(req.params.id));
    res.status(200);
    res.send(inventory);
  } catch {
    res.status(404);
    res.send({ error: "Inventory doesn't exist!" });
  }
});

router.put("/inventory/:id", async (req, res) => {
  try {
    // TODO: TASK 2 ====> Do updates operations here ---> Update single item

    res.status(400);
    res.send({});
  } catch {
    res.status(400);
    res.send({ error: "Inventory doesn't exist!" });
  }
});

router.delete("/inventory/:id", async (req, res) => {
  try {
    iv.removeItem(Number(req.params.id));
    res.status(200);
    res.send({ message: "Item deleted" });
  } catch (err) {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/inventory", async (req, res) => {
  try {
    // TODO: TASK 3 ====> Do updates operations here ---> Erase all Items
    res.status(200);
    res.send({ error: "Inventory emptied!" });
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.get("/special", async (req, res) => {
  try {
    // TODO: TASK 4 ====>
    /**
     * Get the inventory List
     * Check if each item price is contained in the below array
     * ====>>>     [32,50,12,89,10,44,54,19,80,36,23,20]      <=========
     * Return an array of the inventory product name which price is contained in the above array
     */

    res.status(200);
    res.send({});
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

export default router;
