import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Change to false for production
  },
};

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      await sql.connect(config);
      const result =
        await sql.query`SELECT TOP 3 * FROM CardMatchingGame ORDER BY turns ASC`;
      res.status(200).json({ leaderboard: result.recordset });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      await sql.close();
    }
  } else if (req.method === "POST") {
    const { name, turns } = req.body;
    try {
      await sql.connect(config);
      const result =
        await sql.query`INSERT INTO CardMatchingGame (name, turns) OUTPUT INSERTED.* VALUES (${name}, ${turns})`;
      res.status(201).json({ entry: result.recordset[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      await sql.close();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
