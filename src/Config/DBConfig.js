// config/DBConfig.js
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: 'sso',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  },
  port: 1433
};

let pool; // to cache the pool connection


export const  connectToDB = async () => {
  if (pool) {
    return pool;
  }

  try {
    pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    throw err;
  }
};

export default connectToDB;
export { sql };
