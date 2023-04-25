import "https://deno.land/x/dotenv@v3.2.2/load.ts"
import server from "./graphql/server.ts";
import createTAblesInDb from "./database_service/createTablesInDB.ts";


const PORT = Number(Deno.env.get("PORT")) || 3000;

await createTAblesInDb()

server.listen({port: PORT})
