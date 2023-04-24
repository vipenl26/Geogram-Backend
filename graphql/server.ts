import { Server } from "https://deno.land/std@0.166.0/http/server.ts"
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts"
import schema from "./schema.ts";
import "https://deno.land/x/dotenv/load.ts"

const PORT:string = Deno.env.get("PORT") || "3000";

const server = new Server({
    handler: async (req) => {
      const { pathname } = new URL(req.url);
  
      return pathname === "/graphql"
        ? await GraphQLHTTP<Request>({
          schema,
          graphiql: true,
        })(req)
        : new Response("Not Found", { status: 404 });
    },
    port: Number(PORT),

  });


export default server