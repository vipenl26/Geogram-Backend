const whoami = (ctx: object) => {
    console.log(ctx)
    const res = {message: "whoami response"}

    if ('username' in ctx && typeof ctx.username == 'string') {
        res.message = `Hi ${ctx.username}, how was your day?`
    }

    return res
}

export default whoami