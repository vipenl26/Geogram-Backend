import { Application, Router, Status, Context } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import {createHttpError} from "https://deno.land/x/oak@v10.0.0/httpError.ts"
import { applyGraphQL } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import typeDefs from "./typeDefs.ts";
import resolvers from "./resolvers.ts";
import context from "./context.ts";
import { validateJWT } from "../service/jwtHelper.ts";

const server = new Application();

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: context
});

export interface MyContext extends Context<Record<string, any>, Record<string, any>> {
  username?: string;
}


// Authorization middleware
server.use(async (ctx: MyContext, next) => {
  if ('request' in ctx && ctx.request != null) {
    if ('headers' in ctx.request && ctx.request.headers != null) {
      const headers = ctx.request.headers;
      
      if ('get' in headers && typeof headers.get == 'function') {
        const Bearer = headers.get('Bearer')
        if (Bearer != null) {
          const res = await validateJWT(Bearer)
          if (res.isValid && 'payload' in res) {
            if (res.payload != undefined && 'username' in res.payload && typeof res.payload.username == 'string') {
              console.log(res.payload.username)
              ctx.username = res.payload.username
            }
            return await next()
          }
        }
      }
    }
  }

  if ('request' in ctx && ctx.request != null && 'hasBody' in ctx.request && ctx.request.hasBody==true) {
    if ('body' in ctx.request) {
      const body = ctx.request.body()
      if ('type' in body && body.type == 'json') {
        if ('value' in body) {
          const bodyv = await body.value
          if ('query' in bodyv && typeof bodyv.query == 'string' && (bodyv.query.includes('createNewUser') || bodyv.query.includes('signIn'))) {
            return await next();
          }
        }
      }
    }
  }


  throw createHttpError(Status.Unauthorized, "Unauthorized")
});

server.use(GraphQLService.routes(), GraphQLService.allowedMethods());

export default server;
