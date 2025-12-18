const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET = "TEMP_SECRET";

app.use(cors());
app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN:", email, password);

  if (email === "admin@gmail.com" && password === "admin123") {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
