import { gql } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";


const typeDefs_graphql = Deno.readTextFile("./graphql/typeDefs.graphql")
const typeDefs = gql(await typeDefs_graphql)

export default typeDefs