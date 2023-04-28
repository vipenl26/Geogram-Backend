import deleteEntryFromFriendsTable from "../database_service/deleteEntryFromFriendsTable.ts"
import { getUserIdFromContext } from "./helper.ts"
import isFriend from "./isFriend.ts"


const unfriend = async(ctx:Record<string, unknown>, yid: string) => {
    const xid = getUserIdFromContext(ctx)
    if (!(await isFriend(ctx, yid))) {
        return {message: "User is not a friend", showMessage: true}
    }

    deleteEntryFromFriendsTable(xid, yid)

    return {message: "user is no longer a friend", showMessage: false}
}

export default unfriend