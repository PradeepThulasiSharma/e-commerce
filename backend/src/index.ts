import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Pool } from 'pg';
import type { PoolClient } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkConnection() {
  let client: PoolClient | undefined; // explicitly type it
  try {
    client = await pool.connect(); // assign to outer variable
    console.log("✅ Database connected successfully");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Database connection failed:", err.message);
    } else {
      console.error("❌ Database connection failed:", err);
    }
  } finally {
    if (client) client.release(); // safe release
  }
}

checkConnection();

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received from frontend:");
  console.log("Username:", username);
  console.log("Password:", password);
  // return res.json({ received: { username, password } });
  // Validation
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Backend running on port ${port}`));