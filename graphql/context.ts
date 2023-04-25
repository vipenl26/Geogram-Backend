import { MyContext } from "./server.ts"
const context = (ctx: MyContext) => {
    const res = {username: "", userid: ""}
    if ('username' in ctx && ctx.username != undefined){
        res.username = ctx.username
    }
    if ('userid' in ctx && ctx.userid != undefined) {
        res.userid = ctx.userid
    }



    return res
}

export default context