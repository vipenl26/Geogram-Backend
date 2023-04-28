import getEntriesFromRequestsTable from "../database_service/getEntriesFromRequestsTable.ts"
import { getUserIdFromContext } from "./helper.ts"


const getAllFriendRequests = async(ctx:Record<string, unknown>, limit: number, offset: number) => {
    const id = getUserIdFromContext(ctx)

    return await getEntriesFromRequestsTable(id, limit, offset)
}

export default getAllFriendRequests