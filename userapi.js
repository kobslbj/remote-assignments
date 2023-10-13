require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS;
const ALLOWED_ORIGINS = ["http://localhost:3000", "http://52.195.76.225:3000", "http://52.195.76.225:80", "http://52.195.76.225"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept", "X-Requested-With"],
  })
);

app.use(bodyParser.json());

const connection = mysql.createPool({
  host: "appworks-daabase-rds.cuehq6corug3.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: process.env.DATABASE_PASSWORD,
  database: "assignment",
});

app.get("/healthcheck", (request, response) => {
  response.send("OK");
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  if (
    !name.match(/^[A-Za-z0-9]+$/) ||
    !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ||
    !password.match(
      /((?=.*\d)(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[\~\`\!\@\#\$\%\^\&\*\(\)_\-\+\=\{\[\}\]\|\:\;\"\'\<\,\>\.\?\/\|])).{8,}/
    )
  ) {
    return res.status(400).json({ error: "輸入無效" });
  }

  try {
    const [result] = await connection.execute(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    const user = {
      id: result.insertId,
      name: name,
      email: email,
    };
    res.json({
      data: {
        user: user,
        "request-date": req.headers["request-date"],
      },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "電子郵件已存在" });
    }
    return res.status(500).json({ error: "伺服器錯誤" });
  }
});

// 使用者查詢 API
app.get("/users", async (req, res) => {
  const { id } = req.query;

  // 檢查id是否存在且是有效的數字
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "請提供有效的ID" });
  }

  try {
    const [rows] = await connection.execute(
      "SELECT id, name, email FROM user WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(403).json({ error: "使用者不存在" });
    }
    const user = rows[0];
    res.json({
      data: {
        user: user,
        "request-date": req.headers["request-date"],
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "伺服器錯誤" });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`伺服器在 ${HOST_ADDRESS}:${port} 開始運行`);
});
