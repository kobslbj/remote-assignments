//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
//const dbPassword = process.env.DATABASE_PASSWORD;

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createPool({
  host: "appworks-daabase-rds.cuehq6corug3.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "kk007008",
  database: "assignment",
});

// 使用者註冊 API
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
    return res.status(500).json({ error: "伺服器錯誤" });
  }
});

app.listen(port, () => {
  console.log(`伺服器在 http://52.195.76.225 :${port} 開始運行`);
});
