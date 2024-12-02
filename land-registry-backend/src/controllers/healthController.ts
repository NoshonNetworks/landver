import { Request, Response } from "express";
import { pool } from "../services/db";

export async function healthCheck(_req: Response, res: Response) {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    res.json({ status: "healthy", database: "connected" });
  } catch (error: any) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
    });
  }
}
