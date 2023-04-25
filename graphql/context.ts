import { MyContext } from "./server.ts"
const context = (ctx: MyContext) => {
    if ('username' in ctx){
        return {username: ctx.username}
    }

    return {}
}

export default context