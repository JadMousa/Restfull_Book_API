import dotenv from 'dotenv';
import pg from 'pg';


dotenv.config();

const pgclient = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: false // <== THIS IS KEY if you're on localhost
  });

export default pgclient;