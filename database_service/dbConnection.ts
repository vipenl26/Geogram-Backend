import * as postgres from "https://deno.land/x/postgres@v0.14.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts"


const databaseUrl:string = Deno.env.get("DATABASE_URL")!;

const pool = new postgres.Pool(databaseUrl, 3, true);

const connection = await pool.connect();


export default connection