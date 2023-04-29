import "https://deno.land/x/dotenv@v3.2.2/load.ts"
import server from "./graphql/server.ts";
import createTAblesInDb from "./database_service/createTablesInDB.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const PORT = Number(Deno.env.get("PORT")) || 3000;

await createTAblesInDb()
server.use(oakCors())

server.listen({port: PORT})
