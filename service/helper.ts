

const getFieldFromContext  = (ctx: Record<string, unknown>,  field: string): any => {
    const f = field;
    if (f in ctx && typeof ctx[f] == 'string'){
        return ctx[f]
    }

    return ""
}


const getUserIdFromContext = (ctx: Record<string, unknown>) => {
    return getFieldFromContext(ctx, 'userid')
}

const getUsernameFromContext = (ctx: Record<string, unknown>) => {
    return getFieldFromContext(ctx, 'username')
}

export {getUserIdFromContext, getUsernameFromContext}


