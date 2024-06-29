const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();


const { GoogleGenerativeAI } = require("@google/generative-ai");
const API = "AIzaSyDwtPKNifocCAw4o_unhHCm07DOQA5dD7c";
const genAI = new GoogleGenerativeAI(API);

app.use(express.static("public"));

// Route to handle the generation request
app.get("/generate", async (req, res) => {
  const { prompt } = req.query;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text;

    res.send({ result: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send({ error: "Failed to generate content" });
  }
});

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generative AI test</title>
</head>
<body>
    <h1>Generative Ai Test!</h1>
    <h2>Still On Development!</h2>
    <div>
        <input type="text" id="aiprompt" placeholder="Enter any topic" />
        <button onclick="generate()">Generate</button>
    </div>
    <div class="result">
    ${run()}
    </div>
</body>
</html>`);
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "What is git / github?";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
    console.log(text);
    const resultDiv = document.getElementById('result').innertext = text;
}
run();
