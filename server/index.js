const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;

app.use(cors());

app.get("/coefficients", (req, res) => {
  const coefficientsSet = new Set();
  const coefficientsArray = [];

  while (coefficientsSet.size < 4) {
    let randomCoefficient = (Math.random() * (1.99 - 1.1) + 1.1).toFixed(2);
    coefficientsSet.add(randomCoefficient);
  }

  coefficientsSet.forEach((item) => {
    coefficientsArray.push({ coefficient: item, probability: 0 });
  });

  coefficientsArray.forEach((item) => {
    let probability;
    if (item.coefficient < 1.3) {
      probability = (Math.random() * (85 - 75) + 75).toFixed(2); // 75% - 85%
    } else if (item.coefficient < 1.5) {
      probability = (Math.random() * (78 - 65) + 65).toFixed(2); // 65% - 78%
    } else if (item.coefficient < 1.7) {
      probability = (Math.random() * (65 - 58) + 58).toFixed(2); // 58% - 65%
    } else {
      probability = (Math.random() * (58 - 39) + 39).toFixed(2); // 39% - 58%
    }

    item.probability = probability;
  });

  res.json(coefficientsArray);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
