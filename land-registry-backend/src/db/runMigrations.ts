import fs from 'fs';
import path from 'path';
import { pool } from '../services/db';

async function runMigrations() {
  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'migrations', 'create_users_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Run the migration
    await pool.query(sql);
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigrations(); 