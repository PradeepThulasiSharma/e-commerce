// backend/scripts/createUser.js
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({ connectionString: "postgres://postgres:password@localhost:5432/login_db" });

(async () => {
  const username = "admin";
  const password = "password123";
  const hash = await bcrypt.hash(password, 10);

  await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2)", [username, hash]);
  console.log("✅ User created!");
  process.exit();
})();
