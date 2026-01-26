import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

// Helper: arma un error claro si faltan variables clave
function assertEnv(name, value) {
  if (!value) {
    throw new Error(
      `[DB CONFIG] Falta la variable de entorno ${name}. Revisa tu backend/.env`
    );
  }
}

const {
  DATABASE_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DB_SSL,
} = process.env;

let pool;

// ✅ Prioridad 1: DATABASE_URL (ideal para producción / Render)
if (DATABASE_URL) {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    allowExitOnIdle: true,
  });
} else {
  // ✅ Prioridad 2: variables separadas (local)
  // Evita que PG use el usuario del sistema (ej: "ignac") si DB_USER no existe
  const user = DB_USER || "postgres";
  const host = DB_HOST || "localhost";
  const port = DB_PORT ? Number(DB_PORT) : 5432;
  const database = DB_DATABASE || "opticas_lumina";

  // Si NO defines password en local, te avisamos con error claro
  assertEnv("DB_PASSWORD", DB_PASSWORD);

  pool = new Pool({
    host,
    user,
    password: DB_PASSWORD,
    database,
    port,
    ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    allowExitOnIdle: true,
  });
}

// ✅ Test de conexión (solo fuera de tests)
if (process.env.NODE_ENV !== "test") {
  pool
    .query("SELECT NOW()")
    .then((res) => console.log("Db-connected:", res.rows[0]))
    .catch((err) => {
      console.error("[DB CONFIG] Error conectando a Postgres:", err.message);
      // Detenemos el server para que no corra “a medias”
      process.exit(1);
    });
}

export default pool;
