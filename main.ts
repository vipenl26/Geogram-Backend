import "https://deno.land/x/dotenv@v3.2.2/load.ts"
import server from "./graphql/server.ts";



const PORT = Number(Deno.env.get("PORT")) || 3000;

server.listen({port: PORT})
