import express from "express";
import { getStores } from "./scrapers/chompsScraper.js";
import { exportCSV } from "./utils.js";

const router = express.Router();

const errorHandler = (error, res) => {
  if (error?.message) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ message: error.message });
  } else {
    console.log("Error: Internal Server Error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/download", (req, res) => {
  try {
    const { path } = req.query;
    console.log(`File download successful: ${path}`);
    res.download(path);
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/chomps/stores", async (req, res) => {
  try {
    const { location } = req.body;
    const { stores } = await getStores(location);
    await exportCSV(stores, "csv/chomps.csv");

    console.log("Stores fetched successfully");
    res.json(stores);
  } catch (error) {
    errorHandler(error, res);
  }
});

export default router;
