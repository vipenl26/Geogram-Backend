import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts"
import resolvers from "./resolvers.ts";
import typeDefs from "./typeDefs.ts";


const schema = makeExecutableSchema({ 
    resolvers,
    typeDefs
})

export default schema;