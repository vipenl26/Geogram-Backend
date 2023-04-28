
import getEntriesFromFriendsTable from "../database_service/getEntriesFromFriendsTable.ts"
import { getUserIdFromContext } from "./helper.ts"


const getAllFriends = async(ctx:Record<string, unknown>, limit: number, offset: number) => {
    const id = getUserIdFromContext(ctx)

    return await getEntriesFromFriendsTable(id, limit, offset)
}

export default getAllFriends