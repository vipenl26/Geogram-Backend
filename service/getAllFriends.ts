
import getEntriesFromFriendsTable from "../database_service/getEntriesFromFriendsTable.ts"
import getProfile from "./getProfile.ts"
import { getUserIdFromContext } from "./helper.ts"


const getAllFriends = async(ctx:Record<string, unknown>, limit: number, offset: number) => {
    const id = getUserIdFromContext(ctx)

    const ls =  await getEntriesFromFriendsTable(id, limit, offset)

    const res = []
    for (const x in ls) {
        const obj = await getProfile(ctx, ls[x])
        res.push({...obj, id: ls[x]})
    }

    return res

}

export default getAllFriends