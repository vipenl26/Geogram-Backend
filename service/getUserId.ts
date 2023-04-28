import { getUserIdFromContext } from "./helper.ts"


const getUserId = (ctx:Record<string, unknown>) => {
    const userid = getUserIdFromContext(ctx)

    return userid
}

export default getUserId