import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts"


const typeDefs_graphql = Deno.readTextFile("./graphql/typeDefs.graphql")
const typeDefs = gql(await typeDefs_graphql)

export default typeDefs