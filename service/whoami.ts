const whoami = (ctx: Record<string, unknown>) => {
    const res = {message: "whoami response"}

    if ('username' in ctx && typeof ctx.username == 'string' && 'userid' in ctx && typeof ctx.userid == 'string') {
        res.message = `Hi ${ctx.username}, and your userid is ${ctx.userid}`
    }

    return res
}

export default whoami