const express = require("express");
const cors = require("cors");
const PORT = 8000;
require("dotenv").config();

const executeQuery = require("./connection");

const app = express();

app.use(cors());

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

app.get("/", (req, res) => {
  return res.status(404).json({ error: "Not Found" });
});
app.get("/data", async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM Test123`;
    const result = await executeQuery(query, { id });
    return res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app
  .route("/data/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const query = `SELECT * FROM Test123 WHERE id = '${id}'`;
      const result = await executeQuery(query, { id });
      return res.json(result.recordset);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const query = `DELETE FROM Test123 WHERE id = '${id}'`;
      await executeQuery(query, { id });
      return res.json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      console.error("Error deleting data:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

app.get("/add/:data", async (req, res) => {
  try {
    const dataString = decodeURIComponent(req.params.data);
    const data = JSON.parse(dataString);
    console.log(data);

    const query = `INSERT INTO Test123 (id, brand, model, release_date, os, url) VALUES (NEWID(), '${data.Brand}', '${data.Model}', ${data["Release Year"]}, '${data.OS}', '${data.Url}')`;

    await executeQuery(query);

    return res.json({ success: true, message: "Data added successfully" });
  } catch (error) {
    console.error("Error processing data:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/sort/:data", async (req, res) => {
  try {
    const dataString = decodeURIComponent(req.params.data);
    const data = JSON.parse(dataString);
    const query = `SELECT * FROM Test123 order by ${data}`;
    const result = await executeQuery(query);
    return res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
