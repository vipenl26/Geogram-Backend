import existsInFriendsTable from "../database_service/existsInFriendsTable.ts"
import { getUserIdFromContext } from "./helper.ts"

const isFriend = async(ctx:Record<string, unknown>, yid: string) => {
    const xid = getUserIdFromContext(ctx)

    return await existsInFriendsTable(xid, yid)
}

export default isFriend