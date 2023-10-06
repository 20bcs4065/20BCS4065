const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/numbers", async (req, res) => {
  try {
    let output = [];
    const urls = req.query.url; 
    console.log(urls);

    if (!Array.isArray(urls)) {
    
      urls = [urls];
    }

    for (let url of urls) {
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      const { numbers } = await response.json();
      console.log(numbers);
      output.push(...numbers);
    }

    output = [...new Set(output)].sort((a, b) => a - b);
    res.send({ "numbers": output });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while processing your request." });
  }
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
