import getEntriesFromRequestsTable from "../database_service/getEntriesFromRequestsTable.ts"
import getProfile from "./getProfile.ts"
import { getUserIdFromContext } from "./helper.ts"


const getAllFriendRequests = async(ctx:Record<string, unknown>, limit: number, offset: number) => {
    const id = getUserIdFromContext(ctx)

    const ls = await getEntriesFromRequestsTable(id, limit, offset)

    const res = []
    for (const x in ls) {
        const obj = await getProfile(ctx, ls[x])
        res.push({...obj, id: ls[x]})
    }

    return res
}

export default getAllFriendRequests