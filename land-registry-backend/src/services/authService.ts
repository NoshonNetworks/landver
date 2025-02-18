import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "./db";
import { RegisterDTO, LoginDTO, User } from "../types/auth";
import { AppError } from "../middleware/errorHandler";
import { config } from "../config";
import dotenv from "dotenv";
dotenv.config();

export async function register(
  data: RegisterDTO
): Promise<{ token: string; user: User }> {
  // Check if user already exists
  const existingUser = await query(
    "SELECT * FROM users WHERE email = $1 OR wallet_address = $2",
    [data.email, data.walletAddress]
  );

  if (existingUser.rows.length) {
    throw new AppError(400, "User already exists", "USER_EXISTS");
  }

  // Hash password
  if (!data.passcode) {
    throw new AppError(400, "Password is required", "PASSWORD_REQUIRED");
  }
  const passwordHash = await bcrypt.hash(data.passcode, 10);

  // Create user
  const result = await query(
    `INSERT INTO users (email, password_hash, wallet_address, user_type)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, wallet_address, user_type, created_at, updated_at`,
    [data.email, passwordHash, data.walletAddress, data.userType]
  );

  const user: User = result.rows[0];

  const token = jwt.sign(
    {
      email: user.email,
      walletAddress: user.walletAddress,
      userType: user.userType,
    },
    config.jwtSecret,
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  console.log(token);

  // Return the user and token
  return {
    user: {
      id: user.id,
      email: user.email,
      walletAddress: user.walletAddress,
      userType: user.userType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
}

export async function login(
  data: LoginDTO
): Promise<{ token: string; user: User }> {
  const result = await query("SELECT * FROM users WHERE email = $1", [
    data.email,
  ]);
  const user = result.rows[0];

  if (!user) {
    throw new AppError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  const isValidPassword = await bcrypt.compare(
    data.passcode || "",
    user.password_hash
  );
  if (!isValidPassword) {
    throw new AppError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, userType: user.user_type },
    config.jwtSecret,
    { expiresIn: "24h" }
  );
  
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      walletAddress: user.wallet_address,
      userType: user.user_type,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
  };
}
