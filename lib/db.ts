import "server-only";

import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local in the project root.",
  );
}

const globalForPostgres = globalThis as typeof globalThis & {
  postgresPool?: Pool;
};

function createPool() {
  const pool = new Pool({
    connectionString,
    max: 10,
  });

  pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error", error);
  });

  return pool;
}

export const db =
  globalForPostgres.postgresPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.postgresPool = db;
}
